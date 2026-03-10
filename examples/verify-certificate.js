/**
 * verify-certificate.js
 *
 * Example: verify an AI artifact certificate.
 *
 * This script demonstrates how to:
 *   1. Compute the SHA-256 hash of an artifact
 *   2. Compare it to the hash in a certificate
 *   3. Verify the issuer's Ed25519 signature
 *
 * No SDK required — uses only Node.js built-ins.
 *
 * Usage:
 *   node verify-certificate.js
 */

const crypto = require("crypto");
const https = require("https");
const fs = require("fs");

// ─── Step 1: Compute artifact hash ──────────────────────────────────────────

/**
 * Computes SHA-256 hash of a file or buffer.
 * Returns "sha256:<hex>" format matching the certificate field.
 */
function computeArtifactHash(artifactPath) {
  const data = fs.readFileSync(artifactPath);
  const hash = crypto.createHash("sha256").update(data).digest("hex");
  return `sha256:${hash}`;
}

// ─── Step 2: Compare to certificate ─────────────────────────────────────────

/**
 * Verifies that the artifact's hash matches the certificate's artifact_hash.
 */
function verifyHash(artifactPath, certificate) {
  const computedHash = computeArtifactHash(artifactPath);
  const certHash = certificate.artifact_hash;

  if (computedHash === certHash) {
    console.log("✅ Hash verified:", computedHash);
    return true;
  } else {
    console.error("❌ Hash mismatch");
    console.error("  Expected:", certHash);
    console.error("  Computed:", computedHash);
    return false;
  }
}

// ─── Step 3: Verify Ed25519 signature ───────────────────────────────────────

/**
 * Fetches the issuer's public key from the well-known endpoint.
 * Returns the key matching the key_id in the certificate (if provided).
 */
function fetchPublicKey(publicKeyUrl) {
  return new Promise((resolve, reject) => {
    https.get(publicKeyUrl, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          const keys = JSON.parse(data);
          // Assumes JWKS-style response: { keys: [...] }
          resolve(keys);
        } catch (err) {
          reject(new Error("Failed to parse signing keys: " + err.message));
        }
      });
    }).on("error", reject);
  });
}

/**
 * Verifies the Ed25519 signature on the certificate.
 *
 * The canonical certificate body is the JSON object without the `signature`
 * field, serialized with keys in sorted order (RFC 8785 JCS).
 */
function verifySignature(certificate, publicKeyPem) {
  const { signature, ...body } = certificate;

  // Canonical serialization: sorted keys
  const canonicalBody = JSON.stringify(body, Object.keys(body).sort());

  const verify = crypto.createVerify("ed25519");
  verify.update(canonicalBody);

  const signatureBuffer = Buffer.from(signature, "base64url");
  const valid = verify.verify(publicKeyPem, signatureBuffer);

  if (valid) {
    console.log("✅ Signature verified");
  } else {
    console.error("❌ Signature invalid");
  }

  return valid;
}

// ─── Example usage ───────────────────────────────────────────────────────────

async function main() {
  // Load an example certificate (replace with real path)
  const certificate = {
    certificate_id: "a1b2c3d4-0000-0000-0000-example00001",
    artifact_hash: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    issued_at: "2026-01-15T09:00:00Z",
    issuer: "your-certifying-authority.example.com",
    signature_algorithm: "Ed25519",
    public_key_url: "https://your-certifying-authority.example.com/.well-known/signing-keys.json",
    signature: "<base64url-encoded-signature>",
    verification_url: "https://your-certifying-authority.example.com/verify/a1b2c3d4-0000-0000-0000-example00001"
  };

  console.log("Certificate ID:", certificate.certificate_id);
  console.log("Issuer:", certificate.issuer);
  console.log("Issued:", certificate.issued_at);
  console.log("");

  // In a real implementation:
  // 1. verifyHash("path/to/your/artifact.csv", certificate)
  // 2. const keys = await fetchPublicKey(certificate.public_key_url)
  // 3. verifySignature(certificate, keys[0].pem)

  // For demonstration — hash only
  const testData = "";
  const hash = `sha256:${crypto.createHash("sha256").update(testData).digest("hex")}`;
  console.log("SHA-256 of empty string:", hash);
  console.log("Matches certificate hash:", hash === certificate.artifact_hash);
}

main().catch(console.error);
