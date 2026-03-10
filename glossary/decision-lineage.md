# Decision Lineage

Decision lineage refers to the ability to reconstruct **how and why an AI system produced a specific decision**, at any point in time, including after the fact.

---

## Core Principle

> Artifact certification proves the artifact existed and was unmodified.
> Decision lineage proves how the artifact or model was used to produce a decision.

These two mechanisms together form a complete AI provenance stack.

---

## What a Decision Record Captures

A complete decision record captures:

| Field | Description |
|-------|-------------|
| `decision_id` | Unique identifier for this decision event |
| `timestamp` | When the decision was made |
| `model_version` | Which model produced the decision |
| `policy_version` | Which rule or policy was active |
| `artifact_certificate_id` | Reference to the certified artifact used |
| `decision_output` | The output or classification produced |
| `why` | Human-readable rationale summary |
| `factors` | Contributing factors in structured form |
| `record_hash` | SHA-256 of this record |
| `previous_hash` | Hash of the prior record in the chain |
| `signature` | Cryptographic signature of this record |

See: [schemas/decision-record.schema.json](../schemas/decision-record.schema.json)

---

## Hash Chaining

Decision records form a tamper-evident chain:

```
record_hash(n) → previous_hash(n+1)
```

Each record includes the hash of the previous record. Any modification to a prior record invalidates all subsequent hashes, making tampering detectable.

Genesis records have `previous_hash: null`.

---

## Forensic Reconstruction

Decision lineage enables **forensic reconstruction** of AI behavior:

- *What decision was made?* → `decision_output`
- *What model made it?* → `model_version`
- *What data was it trained on?* → `artifact_certificate_id` → certificate → dataset hash
- *What policy governed it?* → `policy_version`
- *Was the record altered?* → verify `record_hash` and signature

---

## Regulatory Relevance

Decision lineage directly satisfies:

- **EU AI Act Article 12** — automatic logging of high-risk AI system events
- **EU AI Act Article 19** — log retention and audit availability obligations
- **GDPR Article 22** — right to explanation for automated decisions
- **ISO/IEC 42001** — AI system monitoring and audit requirements

---

## Public vs. Private Records

Decision lineage records often contain sensitive inputs. Organizations may maintain:

- **Internal full records** — complete decision context for internal audit
- **Public sterilized records** — redacted or summarized records for external transparency logs

---

*Source: [SyntheticDataNews](https://syntheticdatanews.com) — editorial coverage of AI governance and synthetic data infrastructure.*

*Related: [Decision Logging](https://syntheticdatanews.com/ai-governance/decision-logging) | [AI Audit Trails](https://syntheticdatanews.com/ai-governance/audit-trails)*
