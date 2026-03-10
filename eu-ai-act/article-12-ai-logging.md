# EU AI Act Article 12 — Logging Requirements for High-Risk AI

Article 12 requires high-risk AI systems to **automatically generate logs** of system operation. These logs must enable post-hoc tracing of AI decisions for audit and regulatory review purposes.

---

## Core Requirements

High-risk AI systems must:

1. **Automatically log events** — without requiring human initiation
2. **Enable decision traceability** — logs must allow reconstruction of system behavior
3. **Be tamper-evident** — logs must be protected against unauthorized alteration
4. **Be retained** — for a sufficient period to support regulatory review (see Article 19)

---

## Required Log Content

Article 12 does not specify exact fields, but regulatory guidance and best practice establish that logs must capture enough context to reconstruct what happened, why, and under which conditions.

### Minimum field set

| Field | Description |
|-------|-------------|
| `timestamp` | ISO 8601 timestamp of the event |
| `session_id` | Unique identifier for the operational session |
| `model_version` | Model version active at time of decision |
| `input_reference` | Reference to input data (not necessarily full content) |
| `decision_output` | System output, classification, or recommendation |
| `confidence_score` | Model confidence where applicable |
| `policy_version` | Business or operational rule set active at time of decision |
| `operator_id` | Deployer or operator identifier |

### Recommended additions for full compliance

| Field | Description |
|-------|-------------|
| `artifact_certificate_id` | Reference to the certified artifact used |
| `record_hash` | SHA-256 of this log record |
| `previous_hash` | Hash of the prior record in the chain |
| `signature` | Cryptographic signature of this record |
| `human_oversight_flag` | Whether human review occurred |

---

## Tamper-Evidence Architecture

A tamper-evident log uses **hash chaining**:

```
record_hash(n) = hash(record_content + previous_hash(n-1))
```

Any modification to a prior record invalidates the chain — making unauthorized alteration detectable during audit.

---

## Implementation Reference

See the reference schema: [schemas/decision-record.schema.json](../schemas/decision-record.schema.json)

See an example record: [examples/decision-record-example.json](../examples/decision-record-example.json)

---

## Interaction with Other Articles

| Article | Relationship |
|---------|-------------|
| Article 9 | Logging supports continuous risk management |
| Article 10 | Dataset provenance should be referenced in logs |
| Article 13 | Logs must be accessible to relevant authorities |
| Article 19 | Log retention duration requirements |
| Article 29 | Deployer obligation to maintain logs |

---

## Common Implementation Gaps

- **Logs without model version** — makes reconstruction impossible after model updates
- **No hash chaining** — cannot prove logs have not been altered
- **Insufficient retention** — logs deleted before a regulatory review is triggered
- **No certificate reference** — cannot link decision to the artifact that was certified

---

*Source: [SyntheticDataNews](https://syntheticdatanews.com)*

*Related reading: [Article 12 Logging Requirements](https://syntheticdatanews.com/eu-ai-act/article-12-logging) | [AI Decision Logging Platform](https://syntheticdatanews.com/eu-ai-act/ai-decision-logging-platform)*
