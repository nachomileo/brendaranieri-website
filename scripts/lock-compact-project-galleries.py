"""Lock project galleries to the compact continuous block independently."""
from pathlib import Path

css = Path(__file__).resolve().parents[1] / "app/globals.css"
with css.open("a") as handle:
    handle.write('''

/* Locked project-only gallery layout; independent from practice galleries. */
.project-image-block .project-editorial-grid.is-dense{
  display:block!important;
  columns:3!important;
  column-gap:6px!important;
  margin:0!important;
  padding:0!important;
}
.project-image-block .project-editorial-grid.is-dense figure{
  display:inline-block!important;
  width:100%!important;
  margin:0 0 6px!important;
  padding:0!important;
  break-inside:avoid!important;
  vertical-align:top;
}
.project-image-block .project-editorial-grid.is-dense img{
  display:block!important;
  width:100%!important;
  height:auto!important;
  margin:0!important;
}
@media(max-width:760px){
  .project-image-block .project-editorial-grid.is-dense{columns:2!important;column-gap:5px!important}
  .project-image-block .project-editorial-grid.is-dense figure{margin-bottom:5px!important}
}
''')
print("Locked compact project galleries")
