"""Restore the small editorial gutter and external image references."""
from pathlib import Path

css = Path(__file__).resolve().parents[1] / "app/globals.css"
with css.open("a") as handle:
    handle.write('''

/* Project gallery micro-rhythm: compact, with room for external references. */
.project-image-block .project-editorial-grid.is-dense{
  column-gap:6px!important;
  line-height:normal;
}
.project-image-block .project-editorial-grid.is-dense figure{
  position:static;
  margin:0 0 6px!important;
  line-height:normal;
}
.project-image-block .project-editorial-grid.is-dense figure>span{
  position:static;
  display:block;
  margin:0 0 5px!important;
  padding:0;
  background:transparent;
  color:var(--muted);
  font-size:8px;
  line-height:1;
}
@media(max-width:760px){
  .project-image-block .project-editorial-grid.is-dense{column-gap:5px!important}
  .project-image-block .project-editorial-grid.is-dense figure{margin-bottom:5px!important}
}
''')
print("Restored project gallery micro-gutters")
