# EU AI Act Article 10 — Data and Data Governance

Article 10 of the EU AI Act establishes data governance requirements for high-risk AI systems. It is the primary regulatory basis for **dataset provenance, quality controls, and training data documentation** requirements.

---

## Core Requirements

Article 10 requires that training, validation, and testing datasets used in high-risk AI systems:

1. **Comply with data governance practices** — documented procedures for data collection, labeling, and preprocessing
2. **Are relevant, representative, and error-free** — datasets must be appropriate for the intended purpose
3. **Are examined for bias** — bias identification and mitigation must be documented
4. **Have documented provenance** — the origin, collection method, and any transformations must be traceable

---

## Key Obligations for Organizations

| Obligation | Implementation |
|-----------|----------------|
| Dataset examination | Document source, collection method, preprocessing steps |
| Representativeness | Validate coverage of relevant subgroups and scenarios |
| Bias documentation | Record identified biases and mitigation measures |
| Provenance records | Maintain traceable lineage from source to production |
| Labeling quality | Document annotation procedures and quality controls |

---

## Synthetic Data and Article 10

Synthetic data can satisfy Article 10 requirements when:

- the synthesis algorithm and parameters are documented
- representativeness is validated against the target distribution
- privacy risk assessment is documented
- a verifiable certification record links the dataset to its generation process

Certification records (e.g., SHA-256 hash + Ed25519 signature) create the immutable provenance trail Article 10 requires.

---

## Practical Implementation Steps

```
1. Document dataset origin
   → source data, collection method, date range

2. Record preprocessing steps
   → transformations, filtering, labeling procedures

3. Conduct bias analysis
   → subgroup coverage, label distribution, edge cases

4. Validate representativeness
   → target distribution alignment, fidelity metrics

5. Generate and retain certification record
   → artifact hash + certificate with retained provenance
```

---

## Related Articles

- [Article 12](article-12-ai-logging.md) — Logging requirements for AI decisions
- [Article 19](article-19-log-retention.md) — Log retention obligations

---

*Source: [SyntheticDataNews](https://syntheticdatanews.com)*

*Related reading: [EU AI Act Compliance Guide](https://syntheticdatanews.com/eu-ai-act/compliance-guide) | [Synthetic Data Certification](https://syntheticdatanews.com/synthetic-data/certification)*
