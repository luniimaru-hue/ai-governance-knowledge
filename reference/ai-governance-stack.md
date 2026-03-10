# AI Governance Stack

The AI Governance Stack is a layered model describing the infrastructure required to make an AI system **verifiable, auditable, and compliant** with regulatory requirements.

---

## The Five Layers

```
┌──────────────────────────────────────────────────────────┐
│  Layer 5: Transparency & Verification                    │
│  External verification, public logs, regulatory export   │
├──────────────────────────────────────────────────────────┤
│  Layer 4: Decision Lineage                               │
│  Tamper-evident records of how decisions were made       │
├──────────────────────────────────────────────────────────┤
│  Layer 3: Model Operation                                │
│  Inference, monitoring, human oversight controls         │
├──────────────────────────────────────────────────────────┤
│  Layer 2: Artifact Certification                         │
│  Cryptographic provenance records for AI artifacts       │
├──────────────────────────────────────────────────────────┤
│  Layer 1: Data Governance                                │
│  Dataset generation, validation, provenance, compliance  │
└──────────────────────────────────────────────────────────┘
```

---

## Layer 1 — Data Governance

**What it covers:**
- dataset collection, labeling, and preprocessing
- synthetic data generation and validation
- privacy risk assessment (membership inference, k-anonymity)
- representativeness and bias documentation

**Regulatory basis:** EU AI Act Article 10

**Output:** validated, documented dataset ready for certification

---

## Layer 2 — Artifact Certification

**What it covers:**
- SHA-256 fingerprinting of artifacts
- cryptographic certificate issuance (Ed25519)
- immutable provenance record
- public verification endpoint

**Regulatory basis:** EU AI Act Articles 10, 11

**Output:** signed certificate linking artifact hash to issuance metadata

See: [glossary/ai-artifact-certification.md](../glossary/ai-artifact-certification.md)

---

## Layer 3 — Model Operation

**What it covers:**
- model versioning and registry
- inference pipeline controls
- human oversight enforcement
- anomaly and drift monitoring

**Regulatory basis:** EU AI Act Articles 9, 14, 15

**Output:** governed inference with controlled, versioned model execution

---

## Layer 4 — Decision Lineage

**What it covers:**
- structured decision event logging
- model version, policy version, and artifact references
- rationale and factor capture
- hash-chained tamper-evident records

**Regulatory basis:** EU AI Act Articles 12, 29

**Output:** forensically reconstructable audit trail of AI decisions

See: [glossary/decision-lineage.md](../glossary/decision-lineage.md)

---

## Layer 5 — Transparency and Verification

**What it covers:**
- external certificate verification
- public transparency logs (sterilized where necessary)
- regulatory export packages
- audit trail integrity verification

**Regulatory basis:** EU AI Act Articles 13, 19

**Output:** independently verifiable governance record, available to regulators and auditors

---

## How the Layers Connect

```
Dataset validated → certified (Layer 1→2)
Model trained on certified dataset → model registered (Layer 2→3)
Model deployed → decisions logged with certificate reference (Layer 3→4)
Decision logs retained → available for verification (Layer 4→5)
```

This creates **end-to-end provenance** from dataset to decision.

---

## Core Principle

> Certification proves the artifact.
> Decision lineage proves how the artifact was used.
> Together they form a complete AI provenance stack.

---

*Source: [SyntheticDataNews](https://syntheticdatanews.com)*

*Related reading: [AI Trust Stack](https://syntheticdatanews.com/ai-governance/ai-trust-stack) | [AI Governance Reference Architecture](https://syntheticdatanews.com/ai-governance/reference-architecture)*
