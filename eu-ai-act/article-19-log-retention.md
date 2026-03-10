# EU AI Act Article 19 — Log Retention Obligations

Article 19 establishes obligations for **deployers (operators)** of high-risk AI systems regarding the retention and availability of logs generated under Article 12.

---

## Core Requirements

Deployers of high-risk AI systems must:

1. **Retain logs** generated automatically by the AI system
2. **Ensure availability** for regulatory authorities upon request
3. **Maintain integrity** — logs must remain unaltered during the retention period
4. **Observe retention duration** — logs must be kept for a period appropriate to regulatory review

---

## Retention Duration

The EU AI Act specifies that logs be retained for **at least six months** in most contexts. This is a minimum — organizations in regulated sectors (finance, healthcare, critical infrastructure) should assess whether sector-specific regulations require longer periods.

### Guidance by sector

| Sector | Recommended Retention |
|--------|----------------------|
| General high-risk AI | 6 months minimum |
| Finance (MiFID, DORA) | 5–7 years typical |
| Healthcare (MDR) | Up to 15 years |
| Critical infrastructure | Determined by national requirements |

---

## Deployer vs. Provider Obligations

Article 19 is specifically a **deployer (operator)** obligation. It is distinct from provider (developer) obligations under Article 12.

| Party | Obligation |
|-------|-----------|
| **Provider** (developer) | Build a system capable of automatically generating logs (Article 12) |
| **Deployer** (operator) | Retain those logs and make them available (Article 19) |

In some deployments, the provider and deployer are the same entity.

---

## Practical Retention Architecture

A compliant log retention system typically includes:

```
Operational log store        → short-term, queryable (days–weeks)
  ↓ periodic export
Durable archive              → long-term, tamper-evident (months–years)
  ↓ on audit trigger
Regulatory export package    → structured, signed, exportable on demand
```

---

## Audit Availability

Regulators may request logs as part of:

- post-market monitoring reviews
- incident investigations
- conformity assessment
- fundamental rights impact assessments

Systems must be capable of producing a structured, signed export of all retained logs for a given time window.

---

## Related Articles

- [Article 12](article-12-ai-logging.md) — Automatic logging requirements
- [Article 10](article-10-data-governance.md) — Dataset governance

---

*Source: [SyntheticDataNews](https://syntheticdatanews.com)*

*Related reading: [Article 19 Documentation](https://syntheticdatanews.com/eu-ai-act/article-19-documentation) | [AI Audit Trail](https://syntheticdatanews.com/eu-ai-act/ai-audit-trail)*
