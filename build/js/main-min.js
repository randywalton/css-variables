!function(){"use strict";const e=document.getElementById("red_slider"),t=document.getElementById("blue_slider"),o=document.getElementById("green_slider"),r=document.getElementById("size_slider"),s=document.getElementById("width_slider"),a=document.getElementById("grid_image"),n=document.getElementById("grid_footer"),l=document.getElementById("grid_article01"),d=document.getElementById("grid_article02"),i=document.getElementById("toggleGrid"),y=document.getElementById("radio_btn"),c=document.getElementById("resetGrid_btn"),g=document.documentElement;let p=localStorage.getItem("typestyle"),m=localStorage.getItem("neutraltype"),u=[{storage:localStorage.getItem("storage_red"),target:e},{storage:localStorage.getItem("storage_blue"),target:t},{storage:localStorage.getItem("storage_green"),target:o},{storage:localStorage.getItem("storage_size"),target:r},{storage:localStorage.getItem("storage_width"),target:s}];(function(){let r=!1,s=function(){document.oninput=function(r){if(r.target.classList.contains("slider")){r.stopPropagation();let s=r.target.id,a=document.getElementById(s),n=a.parentNode.getElementsByTagName("SPAN")[0].id,l=s.replace("_slider","");document.getElementById(n).innerHTML=a.value,"width_slider"===s||"size_slider"===s?(g.style.setProperty("--site_base_"+l,a.value+"px"),localStorage.setItem("storage_"+l,a.value)):(g.style.setProperty("--site_base_"+l,a.value),localStorage.setItem("storage_"+l,a.value)),P(e.value,t.value,o.value)}}},_=function(){document.addEventListener("click",(function(e){if(e.target.classList.contains("type_style")){e.stopPropagation();let t=e.target.id,o="Vollkorn, serif",r="Source Sans Pro, sans-serif";"serif"===t?(g.style.setProperty("--type_base_header",o),g.style.setProperty("--type_base_copy",o)):"sans_serif"===t?(g.style.setProperty("--type_base_header",r),g.style.setProperty("--type_base_copy",r)):(g.style.setProperty("--type_base_header",o),g.style.setProperty("--type_base_copy",r)),localStorage.setItem("typestyle",t)}})),i.addEventListener("click",(function(e){e.preventDefault(),r?(a.style.display="none",l.style.display="none",d.style.display="none",n.style.display="none",r=!1):(a.style.display="block",l.style.display="block",d.style.display="block",n.style.display="block",r=!0)})),c.addEventListener("click",(function(e){e.preventDefault(),location.reload()}))},P=function(e,t,o){e<=125&&t<=125&&o<=125?(g.style.setProperty("--text_on_color","white"),localStorage.setItem("neutraltype","white")):e>=125&&t>=125&&o>=125&&(g.style.setProperty("--text_on_color","black"),localStorage.setItem("neutraltype","black"))},f=function(){for(var e in u)if(u.hasOwnProperty.call(u,e)){let t=u[e].target.id;document.getElementById(t).value=u[e].storage,document.getElementById(t).parentNode.getElementsByTagName("SPAN")[0].innerHTML=u[e].storage}},E=function(){g.style.setProperty("--site_base_red",u[0].storage),g.style.setProperty("--site_base_blue",u[1].storage),g.style.setProperty("--site_base_green",u[2].storage),g.style.setProperty("--site_base_size",u[3].storage+"px"),g.style.setProperty("--text_on_color",m),g.style.setProperty("--site_base_width",u[4].storage+"px"),"serif"===p?(y.getElementsByTagName("INPUT")[0].checked=!0,g.style.setProperty("--type_base_header","Vollkorn, serif"),g.style.setProperty("--type_base_copy","Vollkorn, serif")):"sans_serif"===p?(y.getElementsByTagName("INPUT")[1].checked=!0,g.style.setProperty("--type_base_header","Source Sans Pro, sans-serif"),g.style.setProperty("--type_base_copy","Source Sans Pro, sans-serif")):(y.getElementsByTagName("INPUT")[2].checked=!0,g.style.setProperty("--type_base_header","Vollkorn, serif"),g.style.setProperty("--type_base_copy","Source Sans Pro, sans-serif"))};return{init:function(){s(),_(),f(),E()}}})().init();(function(){let e=function(){a.addEventListener("click",(function(e){e.stopPropagation();let o=e.target.parentNode.parentNode.id,r=e.target.parentNode.className,s=e.target.className;t(o,r,s)})),l.addEventListener("click",(function(e){e.stopPropagation();let o=e.target.parentNode.parentNode.id,r=e.target.parentNode.className,s=e.target.className;t(o,r,s)})),d.addEventListener("click",(function(e){e.stopPropagation();let o=e.target.parentNode.parentNode.id,r=e.target.parentNode.className,s=e.target.className;t(o,r,s)})),n.addEventListener("click",(function(e){e.stopPropagation();let o=e.target.parentNode.parentNode.id,r=e.target.parentNode.className,s=e.target.className;t(o,r,s)}))},t=function(e,t,o){let r="--"+e+"-"+t,s=getComputedStyle(document.documentElement).getPropertyValue(r);function a(e){let t=document.getElementById(e),o=getComputedStyle(document.documentElement).getPropertyValue("--"+e+"-top"),r=getComputedStyle(document.documentElement).getPropertyValue("--"+e+"-left"),s=getComputedStyle(document.documentElement).getPropertyValue("--"+e+"-right"),a=getComputedStyle(document.documentElement).getPropertyValue("--"+e+"-bottom");t.getElementsByClassName("nums")[0].innerHTML=r+" - "+(s-1),t.getElementsByClassName("nums")[1].innerHTML=o+" - "+(a-1)}"pushtop"===o&&s>1?(g.style.setProperty(r,--s),a(e)):"pushbottom"===o&&s<9||"pushright"===o&&s<9?(g.style.setProperty(r,++s),a(e)):"pushleft"===o&&s>1?(g.style.setProperty(r,--s),a(e)):console.log("at the edge!")};return{init:function(){e()}}})().init()}();