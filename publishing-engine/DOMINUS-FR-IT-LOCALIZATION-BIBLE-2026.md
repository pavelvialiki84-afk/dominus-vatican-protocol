# DOMINUS — French / Italian localization production bible
Prepared: 2026-11-14 · Status: PREPRODUCTION, not a finished translation or a live release.

## Verified source

The Project file `DOMINUS_EN_KDP.epub` (uploaded 2026-09-26) was reopened and inspected in the project context on 2026-11-14. Its contents identify:
- English book `DOMINUS — The Vatican Protocol. Book One: Schism`, Pavel Velichii.
- CHAPTER 1 to CHAPTER 15 and `INDEX LATINUS`.
- Chapter 1 headed `CAPUT XXIII`; Vatican restricted archive scene on 12 June 2035 at 03:17; Brother Salvatore Ventresca; hardware separation of DOMINUS terminal and optical one-way diode.
- The opening epigraph intentionally alters John 1:1/14, `In principio erat Verbum, sed Verbum factum est Codex.`
- Source excerpt inspected in its entirety up through Salvatore turning the terminal key. This is **not a complete manuscript-wide localization audit**.
- A separate Russian `Vatikanskiy_protokol_Kniga2_Poslednij_den (1).docx` exists but covers Book Two chapters 16–31; it is NOT the base text for Book One translation.
- Before full translation, compare the 2026-09-26 EPUB against the final published English version and any approved subsequent canon fixes. Do not silently use an older edition as the final source.

## Editorial priorities

- Complete bilingual mapping source chapter → localized chapter, line/paragraph IDs, all dialogs and narrative details, `INDEX LATINUS` and metadata. Never summarize or omit dialogue/lore.
- Lyrical yet propulsive literary prose. The thriller's mystery must stay ambiguous; no supernatural confirmation beyond Book One canon.
- Preserve chronology, character identity, typography of terminal logs, classification labels, identifiers, measurements, exact physical mechanisms, future date/time, and causal clues.
- Use authentic French of France and Italian of Italy, professionally line-edited by competent human language editors before publication.
- Do not insert explanations as omniscient narrator commentary; place unavoidable annotations in separate back matter where warranted.
- Preserve every genuine Latin source string exactly pending Latin fact-check, with centered italics and an immediately following parenthesized target-language translation (not an invented Latin motto). Verify any historical/Biblical attribution and intentional scripture alterations.
- Localize date conventions carefully but preserve 2035 chronology and time. Keep `DOMINUS`, device labels, named institutions, and recurring code strings controlled by termbase.
- No switch from `Schism` to `last day` or Book Two plot material, no invented publishing dates, ASINs, ISBNs or prices.

## Market metadata — working options only

FR title: `DOMINUS — Le Protocole du Vatican`.
FR Book One: `Livre I : Schisme`.
FR category hypothesis: `thriller technologique`, `thriller à suspense`, `science-fiction à suspense`. Avoid overselling `ésotérique` unless metadata tests support it.
IT title: `DOMINUS — Il Protocollo Vaticano`.
IT Book One: `Libro primo: Scisma`.
IT category hypothesis: `thriller tecnologico`, `thriller di fantascienza`, `giallo/thriller` — verify actual Amazon taxonomy before listing.
Preserve EN source author identity `Pavel Velichii` for international continuity. Check final title search, rights and market-level naming conflicts before locking.

## Terminology / translator's style sheet (provisional, must be locked with editor)

| Concept | English source | Français (FR) | Italiano (IT) | Notes |
|---|---|---|---|---|
| Series | The Vatican Protocol | Le Protocole du Vatican | Il Protocollo Vaticano | Working public title |
| Volume | Book One: Schism | Livre I : Schisme | Libro primo: Scisma | Retain volume identity |
| Person | Brother Salvatore Ventresca | frère Salvatore Ventresca | fra Salvatore Ventresca | First use as religious brother; do not imply ordained priest |
| Person | Rafael Costa | Rafael Costa | Rafael Costa | Verify surname/accents against final source |
| Person | Luiza Barros | Luiza Barros | Luiza Barros | Preserve `Luiza`, not `Louisa/Luisa` |
| Site | Vatican Apostolic Archive | Archives apostoliques du Vatican | Archivio Apostolico Vaticano | Official current institution |
| Type | restricted vault | salle sécurisée / dépôt à accès restreint | deposito riservato | Translate context, not imaginary official name |
| Science | metrologist | métrologue | metrologa | Accurate science profession; not meteorologist |
| Device | one-way optical data diode | diode de données optique unidirectionnelle | diodo ottico unidirezionale per i dati | Physical one-way, no outgoing command return |
| Concept | testimony | témoignage | testimonianza | Keep distinct from evidence and reconstructed voice |
| Concept | human identity | identité humaine | identità umana | Avoid theological proof |
| Concept | final word | dernier mot | ultima parola | Preserve moral/legal authority meaning |
| System | DOMINUS | DOMINUS | DOMINUS | Uppercase unchanged |
| Latin | CAPUT XXIII | CAPUT XXIII | CAPUT XXIII | Preserve as heading |
| Interface | OCCUPATO | OCCUPATO | OCCUPATO | Treat as literal on-device indicator |
| Latin | Veritas ex algorithmo. | Veritas ex algorithmo. | Veritas ex algorithmo. | Keep Latin exact; translate next line |
| Term | Index Latinus | INDEX LATINUS | INDEX LATINUS | Back matter translation list |

## Translation sample — Chapter 1, opening 3 narrative paragraphs

Source, from the verified English EPUB:
> The Vatican. Restricted vault of the Vatican Apostolic Archive. 03:17, June 12, 2035.
>
> The second click was quieter than the first.
>
> First the mechanical bolt tripped—heavy, forged, put in before electricity ever reached this wing. Then the solenoid of the electromagnetic lock answered—a short, dry, modern sound laid over the old one.
>
> Above the door, the OCCUPATO indicator lit up.

French sample (editorial draft):
> Le Vatican. Salle sécurisée des Archives apostoliques du Vatican. 12 juin 2035, 3 h 17.
>
> Le second déclic fut plus discret que le premier.
>
> D'abord, le pêne mécanique se rétracta — massif, forgé, installé bien avant que l'électricité n'atteigne cette aile. Puis le solénoïde de la serrure électromagnétique répondit : un claquement bref, sec, moderne, plaqué sur le bruit ancien.
>
> Au-dessus de la porte, le voyant OCCUPATO s'alluma.

Italian sample (editorial draft):
> Vaticano. Deposito riservato dell'Archivio Apostolico Vaticano. 12 giugno 2035, ore 03:17.
>
> Il secondo scatto fu più sommesso del primo.
>
> Dapprima si ritrasse il catenaccio meccanico, pesante, forgiato, installato prima ancora che l'elettricità raggiungesse quell'ala. Poi rispose il solenoide della serratura elettromagnetica: un colpo breve, secco, moderno, sovrapposto al rumore antico.
>
> Sopra la porta si accese la spia OCCUPATO.

Editorial caution: the verb `tripped` can imply disengaging, not necessarily visible retraction; compare context and mechanical fact-check before locking translation. The sample above is **only 4 short paragraphs**, not a complete translated chapter.

## Latin sample formatting (rendering specification)

In final EPUB/CSS each Latin string is centered and italicized, its translation is a separate next line in parentheses. Example:

<div align="center"><i>Veritas ex algorithmo.</i></div>
<div align="center">(La vérité vient de l'algorithme.)</div>

Italian equivalent:

<div align="center"><i>Veritas ex algorithmo.</i></div>
<div align="center">(La verità nasce dall'algoritmo.)</div>

Note: HTML above is guidance for EPUB content; translation typography is approved only after rendering in KDP Previewer. Keep the Latin source unchanged and verify Latinity separately.

## Metadata drafts — NONPUBLIC

FR:
`Dans les archives secrètes du Vatican, un fichier porte une date qui n'est pas encore arrivée. Quelques heures plus tard, l'archiviste qui l'a découvert est mort. Le théologien Rafael Costa et la métrologue Luiza Barros remontent une piste où se croisent documents historiques, recherches clandestines et intelligence artificielle. Mais si une machine peut reconstituer la voix et les souvenirs d'un être humain, qui décide de ce que vaut son témoignage ? DOMINUS — Le Protocole du Vatican. Livre I : Schisme. Un thriller où chaque preuve peut devenir un instrument de pouvoir.`

IT:
`Negli archivi riservati del Vaticano compare un file con una data che deve ancora arrivare. Poco dopo, l'archivista che l'ha trovato è morto. Il teologo Rafael Costa e la metrologa Luiza Barros seguono una traccia che attraversa documenti storici, ricerche clandestine e intelligenza artificiale. Ma se una macchina può ricostruire la voce e la memoria di una persona, chi decide quale testimonianza sia vera? DOMINUS — Il Protocollo Vaticano. Libro primo: Scisma. Un thriller in cui ogni prova può trasformarsi in uno strumento di potere.`

The synopses are newly drafted marketing summaries grounded in the opening source and existing book canon, not quotes from the novel. Confirm names, arcs and no spoilers against final text.

## Translation production pipeline

Gate A — Lock source EPUB version, exact file SHA/checksum, chapters and paragraph counts. Reconcile approved editorial changes and compare to actual published English book.
Gate B — Build immutable chapter + dialogue paragraph map and 50–100 term glossary from complete source, including system logs and all Latin variants.
Gate C — Translate FR book in chunks with full continuity memory; parallel IT track only after source/terminology alignment; record `source_id, target_id, edit_status, reviewer, review_date`.
Gate D — 5 passes **per language**: completeness; plot/canon and tense/POV; historical-scientific-theological fact-check; native line edit with restrained style; typo and print/EPUB QA.
Gate E — Typography, citations, Latin preservation; bilingual side-by-side trace, automated paragraph-count mismatch flags (never use count match as proof of semantic fidelity); read on Kindle Previewer devices; alt/metadata accessibility.
Gate F — Final author approval and KDP forms, KDP AI-generated-translation declaration if AI used, current rights and territories, edition-specific identifiers, storefront pages and verified links.
Gate G — Only after confirmed live pages update multilingual homepage, reader hub, marketing text and social announcements.

## Kindle policy check (as of 2026-11-14)
- French and Italian are accepted KDP book languages: https://kdp.amazon.com/en_US/help/topic/G200673300
- Kindle Translate (English → French France / Italian) is **invite-only beta**, check author eligibility in actual KDP account: https://kdp.amazon.com/en_US/help/topic/G9LWBTHMUDT8EQPK
- KDP requires AI-generated translations to be declared even after substantial human editing: https://kdp.amazon.com/en_US/help/topic/G200672390
- Kindle content language, KDP listing language and EPUB metadata should match: https://kdp.amazon.com/en_US/help/topic/GQSHRFWZ5CEY7XAC
- No automatic upload, KDP submission, ad purchase, new public marketing landing or price setting without editorial gate and author approval.

## Status scoreboard
- FR title/options: drafted.
- IT title/options: drafted.
- FR/IT style sheet and initial terminology: drafted.
- FR/IT Chapter 1 opening sample: drafted, not yet line-edited by native editor.
- Full FR translation: **not started**.
- Full IT translation: **not started**.
- FR/IT EPUB files and covers: **not yet created**.
- KDP submission/public sales: **not started**.
