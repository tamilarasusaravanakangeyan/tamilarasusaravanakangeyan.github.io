---
title: "Tamilarasu Saravanakangeyan"
description: "Enterprise architecture, cloud, AI and digital-identity engineering — Tamilarasu Saravanakangeyan"
type: "home"
---

<!-- # Tamilarasu Saravanakangeyan -->


<div style="display: flex; align-items: center; gap: 2rem; margin: 1.5rem 0; flex-wrap: wrap;">
  <img src="/images/me.png" alt="Tamilarasu Saravanakangeyan" style="width: 20%; min-width: 140px; max-width: 200px; aspect-ratio: 1 / 1; object-fit: cover; border-radius: 50%;" />
  <p style="flex: 1; min-width: 260px; margin: 0; font-size: 1.05rem; line-height: 1.55;">
    <b>Technical Lead · Enterprise & Solution Architect</b> — TOGAF® · Azure & Google Cloud Certified · M.Tech Data Science (BITS Pilani)<br/><br/>
    13+ years architecting cloud-native, AI-driven and identity-secure platforms for global aviation. I turn enterprise constraints into shippable systems — from multi-cloud microservices and Generative AI agents to standards-grade digital identity.
  </p>
</div>

{{% notice tip %}}
Currently leading AI, payments and digital-identity programmes at **Qatar Airways Global Sales**, and contributing the airline-side reference implementation to the **IATA DAT-PoC C2** — *Verifying Digital Identity in the Distribution Process* (2026).
{{% /notice %}}

###### Connect: [GitHub](https://github.com/tamilarasusaravanakangeyan/) · [LinkedIn](https://www.linkedin.com/in/tamilarasusaravanakangeyan/) · [X](https://x.com/tamilarasusarav) · [Email](mailto:tamilsmtp@gmail.com)

## About

TOGAF-certified Technical Lead with 13+ years across aviation and consulting, delivering scalable cloud-native solutions on Azure, Google Cloud and Red Hat OpenShift. I work across the full enterprise stack — DDD microservices, event-driven integration, B2B/B2C identity, and AI orchestration patterns (LLM, RAG, MCP, Semantic Kernel) — aligning technology choices with measurable business outcomes.

The last decade has been inside Qatar Airways' Global Sales and Crew platforms: leading the modernisation from heavyweight on-prem APIs to a cloud-agnostic OpenShift estate, and now extending it with Generative AI, payment orchestration, and verifiable-credential identity.

## Featured Work

**Generative AI Chatbot — Travel Agency Portal** *(2026)*  
Multi-agent **LLM + RAG + MCP** chatbot on Azure to deflect contact-centre calls. Led delivery across data, ML and platform teams over three PI cycles, with SecOps sign-off, content moderation and prompt-injection defence.

**Refund Orchestration — Crisis-Era Service** *(2026)*  
Staged, idempotent **Ticket + EMD refund** orchestration over CAPP, Amadeus (EAG) and the payment gateway. Concurrency-safe row-claim processing absorbed a mass-cancellation surge with **zero incidents**; **EMD refund capability launched in 24 hours**.

**IATA Financial Gateway** *(2026)*  
Centralised **payment-orchestration microservice** on Azure Red Hat OpenShift, integrating IATA IF via APIM and Oracle ExaCC over ExpressRoute — one governed channel with PCI DSS compliance BYOK encryption and end-to-end auditability.

**Document Intelligence — Passport Name Correction Automation** *(2024)*  
**Azure Document Intelligence** OCR wired into booking microservices for real-time name corrections. **Prebuilt models self-hosted on AKS** using the Azure AI **data-plane / control-plane** split — passport PII never leaves the in-org VNet, satisfying GDPR data-residency. **80% reduction in manual agent interventions**, with confidence-thresholded auto-correct and agent-handoff fallback for ambiguous cases.

**ARO Cloud-Native Migration** *(2023 — foundational)*  
Monolithic Web APIs decomposed into **DDD microservices on active-active ARO (PR + DR)**, cloud-agnostic with Red Hat OpenShift on Google Cloud as secondary. Replaced 4 × (12-core, 64 GB) VMs with 15 DDD microservices each of - 0.1-core / 2 GB containers — **~75% infrastructure cost reduction and ~10× scalability headroom**. Quartz → ARO Cron Jobs; APIM + Apigee + Ocelot behind F5 / Checkpoint / FortiGate.

**Salesforce CRM with Shield + BYOK** *(2022)*  
Galaxy CRM migration to Salesforce with OAuth + Azure AD SSO, real-time + ETL flows, **Salesforce Shield + BYOK with weekly automated key rotation** (Fortanix → Key Vault → DevOps → Salesforce), Einstein activity capture and Lead/Opportunity scoring.

## Industry Contributions

**IATA Digital Identity in Distribution** *(2025 – 2026)*

- **2025 — Whitepaper contributor:** *Exploring AI and Digital Identity Use Cases in Aviation*. Framed the **digital-employee-ID for distribution** use case and reviewed the Interoperability Profile against airline NDC realities. [Whitepaper PDF](https://www.iata.org/contentassets/a46387f9bc6b42368c0a72664f6f930f/data-tech-poc-2025.pdf#34)
- **2026 — DAT-PoC C2 implementation lead** for the **Qatar Airways NDC AirShopping middleware** (UC1 airline-verifier reference): VP-token extraction from `DistributionChain`, hopae DID verification (feature-flagged via `Hopae:Enabled`), WS-Security PasswordDigest with anti-replay, and the **NDC 24.1 → 21.3 transform** that lets agency-side and GDS-side coexist. [Public repo](https://github.com/iata-poc/iata-dat-poc-c2-verifying-digital-identity-in-distribution-process)
- IATA confirmed the broader 2026 digital-identity programme as **interoperable at scale** — [April 2026 press release](https://www.iata.org/en/pressroom/2026-releases/2026-04-08-01/).

## Core Skills

- **Cloud & Platform** — Azure, Google Cloud, **Azure Red Hat OpenShift (active-active PR + DR)**, Docker, OpenShift, ExpressRoute
- **AI / ML** — Generative AI (LLM), **RAG**, **Model Context Protocol (MCP)**, multi-agent orchestration, Semantic Kernel, Azure AI / Document Intelligence, Isolation Forest, KNN
- **Architecture & Integration** — DDD microservices, event-driven design, Azure APIM, Apigee, Ocelot, MuleSoft, STRIIM, Apache Camel, IBM MQ, Kafka
- **Identity & Security** — Azure AD / B2C, Keycloak, OAuth 2.0, OpenID Connect, **OpenID4VP**, **Verifiable Credentials (W3C VCDM 2.0, SD-JWT VC)**, DIDs, Salesforce Shield + BYOK, DKIM / DMARC / SPF
- **Data** — Oracle (incl. ExaCC), MS SQL, PostgreSQL, MongoDB, Liquibase, Hadoop, Tableau, Power BI, Kibana
- **DevOps** — Azure DevOps, Git, SonarQube, JFrog Xray, Invicti, **APIOps**, Liquibase database promotion

## Experience

### Qatar Airways *(September 2015 – present)*

**Technical Lead** *(August 2021 – present)* — Lead architect for the Galaxy Global Sales modernisation arc: 2023 ARO cloud-native migration; Salesforce + APIM CRM stack; AI services (Azure Document Intelligence passport-OCR, Generative AI chatbot); IATA Financial Gateway and crisis-era Refund Orchestration. IATA DAT-PoC C2 contributor; mentor across cloud-native, AI, and identity patterns.

**Systems Engineer** *(September 2015 – August 2021)* — Designed and built cloud-native services on Azure for crew and commercial workloads (PrismNeo, IPrism, Cabin Services Crew Mgmt, Azure AD B2C agency portal SSO, low-code auditing platform, ML anomaly detection).

### NTT DATA — Software Developer *(August 2014 – September 2015)*

Fidelity Investment Tracker (Fidelity / FIS): translated complex business requirements into modular software and optimised stored procedures, functions and views for performance.

### Odessa Technologies — Software Developer *(June 2012 – August 2014)*

Leasewave platform — WRC fleet engagement and CSI-Leasing Mexico. Production support, enhancements, and rapid issue resolution for business-critical leasing systems.

## Education

- **M.Tech, Data Science** — Birla Institute of Technology and Science (BITS Pilani), 2019 – 2021 · GPA 8.7/10
- **B.E., Electronics & Communication** — Anna University, 2008 – 2012 · GPA 8.3/10

## Certifications & Recognition

- **TOGAF® 9** Certified Enterprise Architect
- **Microsoft Azure** Certified
- **Google Cloud** Certified
- Delivery Excellence Award — Qatar Airways
- Fast Tracker Award — Odessa Technologies

## Blog

Technical writing is organised under **AI**, **Cloud**, **DevOps**, **.NET**, **Software Architecture** and **Blogs** in the sidebar.

## Contact

Always open to discuss enterprise architecture, AI platforms, identity, and aviation-distribution integration.

📧 [tamilsmtp@gmail.com](mailto:tamilsmtp@gmail.com)
