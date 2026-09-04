"""Unify and compact the narrative section headings on both practice pages."""
from pathlib import Path

css_path = Path(__file__).resolve().parents[1] / "app/globals.css"
with css_path.open("a") as css:
    css.write('''

/* Practice narratives: compact, integrated editorial hierarchy. */
.practice-narrative>header{
  grid-template-columns:32px minmax(230px,4fr) minmax(320px,5fr);
  column-gap:28px;
  align-items:start;
  padding:16px 0 42px;
}
.practice-narrative>header>span,
.practice-narrative>header>div{padding-top:0}
.practice-narrative h2{
  max-width:520px;
  margin:0 0 12px;
  font-size:clamp(24px,2.25vw,36px)!important;
  line-height:1.06!important;
  letter-spacing:-.025em;
}
.practice-narrative>header>div>p{
  margin:0;
  font-size:10px;
  line-height:1.4;
  letter-spacing:.07em;
}
.practice-narrative-copy{max-width:680px}
.practice-narrative-copy p{
  margin:0;
  font-size:clamp(15px,1.15vw,18px)!important;
  line-height:1.5!important;
  letter-spacing:0!important;
}
.practice-narrative-copy p+p{margin-top:1em}
@media(max-width:760px){
  .practice-narrative>header{grid-template-columns:26px 1fr;gap:0 12px;padding:12px 0 32px}
  .practice-narrative h2{font-size:clamp(25px,8vw,36px)!important}
  .practice-narrative-copy{grid-column:2;margin-top:28px}
  .practice-narrative-copy p{font-size:16px!important;line-height:1.5!important}
}
''')
print("Refined both practice-page narrative headings")
