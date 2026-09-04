"""Move the final Home project strips as intact units to the right edge."""
from pathlib import Path

css_path = Path(__file__).resolve().parents[1] / "app/globals.css"
with css_path.open("a") as css:
    css.write('''

/* Preserve each strip's internal sizing; move the intact strip to the right. */
.project-composition.is-right-aligned{
  width:fit-content;
  max-width:100%;
  margin-left:auto;
  justify-content:flex-start;
}
@media(max-width:760px){
  .project-composition.is-right-aligned{
    width:fit-content!important;
    max-width:none;
    margin-left:auto;
    justify-content:flex-start;
  }
}
''')
print("Preserved strip sizing and aligned intact strips right")
