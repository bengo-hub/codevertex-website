# Sprint 4 — Vera AI Chatbot & Lead Capture

**Theme:** Claude-powered AI chatbot, lead qualification, chatbot API  
**Status:** ✅ Complete  
**Duration:** Week 4

---

## Goals

- Build Vera AI chatbot (floating widget, full conversation UI)
- Claude Haiku 4.5 proxy API route
- Lead capture — save qualified leads to PostgreSQL
- Chatbot context: knows Codevertex products, courses, pricing

## Deliverables

- [x] `ChatBot` component — floating button, slide-up panel, message history
- [x] `POST /api/chat` — proxies to Claude Haiku with Codevertex system prompt
- [x] `POST /api/leads` — saves chatbot-captured leads to `leads` table
- [x] System prompt: course catalog, pricing, contact info, Power Suite overview
- [x] Markdown rendering with `react-markdown` + `remark-gfm`
- [x] Lead capture: form fields (name, email, phone, topic, preferred_time)
- [x] Toast notifications via Sonner

## Chatbot Personality

**Name:** Vera  
**Tone:** Professional, warm, concise — "a knowledgeable colleague, not a salesperson"  
**Capabilities:**
- Answer questions about all Digitika courses
- Quote prices and duration
- Explain Power Suite products
- Capture lead information and save to DB
- Escalate to human: WhatsApp +254 743 793 901

## Notes

- Model: Claude Haiku 4.5 (fast, cost-effective for chat)
- Prompt caching not yet enabled — add in Sprint 8 for cost optimisation
- Rate limiting not yet implemented — add before public launch
