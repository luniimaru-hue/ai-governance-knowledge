# AI Audit Architecture

This document describes the architecture of a **fully auditable AI system** — one that can satisfy regulatory review under the EU AI Act, ISO/IEC 42001, and similar frameworks.

---

## Overview

An auditable AI system is not a single component — it is a set of interconnected systems that collectively enable:

1. **Provenance** — where did the data and model come from?
2. **Traceability** — what decisions were made, and when?
3. **Integrity** — have the records been altered?
4. **Availability** — can the records be produced for audit?

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        External Audit Layer                          │
│   Regulator / Auditor access | Certificate verification | Exports   │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────┐
│                       Verification Layer                             │
│   Public signing keys | Certificate registry | Transparency log     │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────┐
│                      Decision Logging Layer                          │
│   Tamper-evident records | Hash chaining | Retention store          │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────┐
│                      Model Operation Layer                           │
│   Versioned inference | Human oversight controls | Monitoring       │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────┐
│                    Artifact Certification Layer                       │
│   SHA-256 fingerprinting | Ed25519 signatures | Certificate records  │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────┐
│                      Dataset Governance Layer                        │
│   Provenance | Quality validation | Bias analysis | Documentation   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### Dataset Governance Layer

| Component | Purpose |
|-----------|---------|
| Data catalog | Tracks source, collection method, version |
| Validation pipeline | Fidelity, utility, and privacy risk metrics |
| Bias analysis records | Subgroup coverage and mitigation documentation |
| Provenance records | Immutable lineage from source to production |

### Artifact Certification Layer

| Component | Purpose |
|-----------|---------|
| Hash computation | SHA-256 of canonical artifact |
| Certificate issuance | Signed record linking hash to metadata |
| Certificate store | Queryable registry of issued certificates |
| Public key endpoint | `/.well-known/signing-keys.json` for verification |

### Model Operation Layer

| Component | Purpose |
|-----------|---------|
| Model registry | Versioned model catalog with artifact references |
| Inference pipeline | Controlled execution with version tracking |
| Human oversight hooks | Review triggers and approval records |
| Monitoring | Drift, performance, and anomaly detection |

### Decision Logging Layer

| Component | Purpose |
|-----------|---------|
| Event capture | Automatic logging of all high-risk decisions |
| Record schema | Structured fields including model/policy version |
| Hash chaining | `record_hash(n)` → `previous_hash(n+1)` |
| Retention store | Durable, tamper-evident long-term log storage |

### Verification Layer

| Component | Purpose |
|-----------|---------|
| Certificate verification API | `GET /verify/{certificate_id}` |
| Transparency log | Public-facing sterilized decision records |
| Integrity checker | Validates hash chain continuity |

### External Audit Layer

| Component | Purpose |
|-----------|---------|
| Audit export | Structured, signed package of records for regulators |
| Authority access | Controlled access for competent authority review |
| Incident reconstruction | Forensic replay of a decision sequence |

---

## Data Flow: End-to-End Governance Lifecycle

```
1. Dataset collected or generated
   → validated for quality, bias, representativeness
   → certified (hash + signature)

2. Model trained on certified dataset
   → model registered with certificate reference
   → model versioned

3. Model deployed for inference
   → each decision logged automatically
   → log record includes: model_version, policy_version, artifact_certificate_id
   → each record hashed and chained

4. Logs retained for required period
   → tamper-evident storage
   → available for regulatory export

5. Audit triggered (incident, review, or inspection)
   → regulator requests records for time window
   → export package generated: records + certificates + public keys
   → verifier can independently confirm integrity
```

---

## Implementation Notes

- **Record hash chaining** is the minimum required for tamper-evidence. Full Ed25519 signatures per record provide stronger guarantees.
- **Retention period** should be at least 6 months per EU AI Act Article 19; sector-specific regulations may require longer.
- **Sterilization** of public records protects sensitive input data while preserving auditability of decision outcomes.

---

*Source: [SyntheticDataNews](https://syntheticdatanews.com)*

*Related reading: [AI Governance Reference Architecture](https://syntheticdatanews.com/ai-governance/reference-architecture) | [AI Audit Trail](https://syntheticdatanews.com/eu-ai-act/ai-audit-trail)*
