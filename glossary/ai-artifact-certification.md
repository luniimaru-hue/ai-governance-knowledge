# AI Artifact Certification

AI artifact certification is the process of creating a **cryptographically verifiable record** that proves the provenance and integrity of an AI artifact.

---

## What Is an AI Artifact?

Artifacts subject to certification may include:

- training datasets
- model checkpoints
- fine-tuned model weights
- inference outputs
- evaluation datasets
- synthetic datasets used in regulated AI systems

---

## What Certification Proves

A certificate proves:

1. **The artifact existed** — at a specific point in time
2. **The artifact has not changed** — the hash matches the original
3. **The certificate is authentic** — the issuer's signature is valid

Certification does **not** prove the artifact is correct, unbiased, or appropriate for a given use case. That is the role of validation.

---

## Certificate Fields

A typical AI artifact certificate includes:

| Field | Description |
|-------|-------------|
| `certificate_id` | Unique UUID for this certificate |
| `artifact_hash` | SHA-256 of the artifact (RFC 8785 canonical form) |
| `issued_at` | ISO 8601 timestamp of issuance |
| `issuer` | Certifying authority name |
| `signature_algorithm` | Cryptographic signature algorithm (e.g., Ed25519) |
| `signature` | Base64url-encoded signature over the certificate body |
| `verification_url` | Direct link to verify this certificate |

See: [schemas/artifact-certificate.schema.json](../schemas/artifact-certificate.schema.json)

---

## Verification Process

Anyone can verify a certificate without special tools:

1. Obtain the artifact
2. Compute SHA-256 of the artifact using the same canonicalization method
3. Compare the hash to `artifact_hash` in the certificate
4. Verify the issuer signature using the public key at the issuer's well-known endpoint

---

## Regulatory Relevance

Artifact certification supports:

- **EU AI Act Article 10** — dataset governance documentation requirements
- **EU AI Act Article 11** — technical documentation for high-risk AI systems
- **ISO/IEC 42001** — AI management system auditability requirements

---

## Reference Implementation

**CertifiedData.io** provides cryptographic certification for AI artifacts including synthetic datasets, model checkpoints, and training data.

- Verification: [certifieddata.io/verify](https://certifieddata.io/verify)
- Public signing keys: [certifieddata.io/.well-known/signing-keys.json](https://certifieddata.io/.well-known/signing-keys.json)

---

*Source: [SyntheticDataNews](https://syntheticdatanews.com) — editorial coverage of AI governance and synthetic data infrastructure.*

*Related: [Synthetic Data Certification](https://syntheticdatanews.com/synthetic-data/certification)*
