"""Make project galleries truly continuous, with zero gutters or label gaps."""
from pathlib import Path

css = Path(__file__).resolve().parents[1] / "app/globals.css"
with css.open("a") as handle:
    handle.write('''

/* Final project-gallery contract: a continuous block with zero white gaps. */
.project-image-block .project-editorial-grid.is-dense{
  column-gap:0!important;
  line-height:0;
}
.project-image-block .project-editorial-grid.is-dense figure{
  position:relative;
  margin:0!important;
  padding:0!important;
  line-height:0;
}
.project-image-block .project-editorial-grid.is-dense figure>span{
  position:absolute;
  z-index:2;
  top:5px;
  left:5px;
  margin:0!important;
  padding:3px 4px;
  background:rgba(244,242,237,.82);
  color:var(--ink);
  font-size:8px;
  line-height:1;
}
.project-image-block .project-editorial-grid.is-dense .zoomable-artwork-image,
.project-image-block .project-editorial-grid.is-dense img{
  display:block!important;
  margin:0!important;
  padding:0!important;
  border:0!important;
  line-height:0;
}
@media(max-width:760px){
  .project-image-block .project-editorial-grid.is-dense{column-gap:0!important}
  .project-image-block .project-editorial-grid.is-dense figure{margin:0!important}
}
''')
print("Removed every project gallery gutter")
