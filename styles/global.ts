import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body{
  background-color: #12151D;
  color: #fff !important;
  font-size: 1em;
}

.bg-dark{
  background-color:#1F2331 !important;
}
.navbar .navbar-nav .nav-link{
  color: #fff !important;
  position: relative;
}
.right-nav{
  float: right ;
}
.navbar .navbar-nav .nav-link::after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #6822b8;
  color: transparent;
  width: 0%;
  content: '.';
  height: 0.2em;
}
.navbar .navbar-nav .nav-link {
  transition: all 0.5s;
}
.navbar .navbar-nav .nav-link.active::after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #6822b8;
  color: transparent;
  width: 100%;
  float: left;
  margin: auto;
  content: '.';
  height: 0.2em;
}


.navbar .navbar-nav .nav-link:hover::after {
  width: 100%;
  float: left;
}
@media only screen and (min-width: 960px) {
  .navbar .navbar-nav .nav-link {
    padding: 1em 0.7em;
  }
  .navbar {
    padding: 0;
  }
  .navbar .navbar-brand {
    padding: 0 0.7em;
  }
}

div.card-body-image{
  position: relative;
  height: auto;
}
.border-primary{
  border: 0.1em solid #6822b8 !important;
}
.card-body{
  padding: 0%;
}
#clip{
  position: relative;
  top: 0;
  left: 50%;
  display: block;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border: 10px solid black;
}
div.card-body-image img::after{
  width: 0%;
  height: 0%;
}
div.col-md-4 .mr-10{
  margin-right: 0.7em;
}
div.col-md-10 .ml-10{
  margin-left: 0.7em;
}
p{
  display: inline-block;
}
p.specs{
  line-height: 0.7rem;
  border-radius: 0.9em;
}
div.specs-text{
 margin-top: -100px !important;
 padding: 0 1em !important;
}

.list-group-item{
  padding: 0.4rem 0;
  margin: 0.35em 0;
  background-color: inherit;
  color: white;
  border: none !important;
}
.putbg-image{
  background-image: url('./icons/profiler.png');
  background-attachment: fixed;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
background-size: 100% 100%;
}
.list-group-item i{
  margin-right: 0.7em;
}
.left-div{
  box-shadow: -.5px -.5px 0 .5px #0d6efd, inset -1px -1px 0 0 #0d6efd;
}
.mr-10{
  margin-right: 10px;
}
table{
  border: 1px solid #0d6efd;
  border-bottom: none;
}
thead{
  border-bottom: 1px solid #0d6efd !important;
}
tbody{
  border:none !important;
}
.bg-warning{
  background-color: #0ee9a8 !important;
}
.text-warning{
  color: #0ee9a8 !important;
}
.text-danger{
  color: #ff4747 !important;
}
.bg-danger{
  background-color: #ff4747 !important;
}

.vertical-line-icon {
  display: table;
  height: 50px;
}
.vl-warning{
  border-left: 3px solid #0ee9a8;
  height: 25px;
  margin-right: 20px;
  padding: 6px 0;  
}
.vl-danger {
  border-left: 3px solid #ff4747;
  height: 25px;
  margin-right: 20px;
  padding: 6px 0px;
}
.vertical-line-icon:after {
  content: '';
  display: table;
  margin: 0 auto;
  width: 4px;
  height: 100%;
  background-color: white;
  margin-right: 35px !important;
}
th{
  padding-left:30px !important;
  padding-right:0;
  padding-top: 15px !important;
  padding-bottom: 15px !important;
}
td{
    padding: 15px 10px !important;
}
.margin-nav-auto{
    margin: auto;
}

.topnav {
	padding: 0 5%; 
}
@media (max-width: 1100px)
{
  #clip{
      width: 140px;
      height: 140px;
      top: -20px;
  }
  div.specs-text h5{
      margin-top: 40px;
   }
}

@media (max-width: 770px)
{
	.topnav {
		padding: 0 1%; 
	}
  #clip{
      width: 200px;
      height: 200px;
      border: 5px solid black;
  }
  .mr-10{
      margin-right: 0px;
  }
  div.col-md-4 .mr-10{
      margin-right: 0px;
  }
  .social-icons{
      justify-content: left;
      margin-left: 10px;
  }
  .social-analysis-icons{
      justify-content: center;
      margin-left: 10px;
  }
  .main-div{
      margin-bottom: 20px;
  }
  .h-analytics{
      margin-bottom: 20px;
  }
  .footer-icons{
      justify-content: center;
	  margin-bottom: 8px;
  }
  .footer-text{
      justify-content: center;
	  padding-bottom: 12px;
  }
  .right-nav{
      float: left;
      margin-right: 0;
      margin-left: 17px;
  }
  .margin-nav-auto{
      margin: auto 0 auto 10px;
  }
  .navbar .navbar-nav .nav-link:hover::after {
      width: 70px;
      margin: 0;
      margin-right: auto;
    }
    
  .navbar .navbar-nav .nav-link.active::after {
      width: 70px;
      margin: 0;
      margin-right: auto;
    }
}
@media (max-width:430) {
  #clip{
      width: 90px;
      height: 90px;
      top: -10px;
      border: 4px ;
  }
}
.text-bold{
  font-weight: bold;
}
.font-18{
  font-size: 18px;
}

.font-24{
  font-size: 24px;
}
.font-22{
  font-size: 22px;
}
.font-20{
  font-size: 20px;
}
.font-15{
  font-size: 15px;
}
a{
  color: #fff;
  text-decoration: none;
}
a:hover{
  color: #fff;
  text-decoration: none;
}
.btn:focus, .btn.focus{
  box-shadow: 0 transparent;
}
.c-footer{
    bottom: 0;
    width: 100%;
    height: auto;
}
.u-footer{
  position: absolute;
    bottom: 0;
    width: 100%;
    height: auto;
}
.navbar .navbar-nav .nav-link::after{
  background-color: transparent;
}
.profile-modal .modal-content{
background-color: #000 !important;
}
.profile-modal .ant-form-item-label > label{
color: #fff !important;
}
.profile-modal .ant-input{
  background: rgb(57, 61, 66);
  border: rgb(255, 255, 255);
  color: rgb(255, 255, 255);
  border-radius: 20px;
  }
.profile-modal .modal-header{
  border-bottom:0;
  }
@media (max-width: 350px)
{
	.footer-text{
		font-size: 14px;
	}
	
}
.change_wallet-wrapper .ant-dropdown-menu-item:hover{
	background-color: #1a2029;
}
.change_wallet-wrapper .ant-dropdown-menu-item{
  margin-right: 20px;
}
.right-nav .ant-btn:hover, 
.right-nav .ant-btn:focus,
.right-nav .ant-btn:active{
  background: transparent;
  color: #ffffff;
}

@media (max-width: 300px)
{
	.navbar{
		padding: 0.5rem;
	}
	.footer-text{
		font-size: 12px;
	}
	
}




.leader-heading{
  font-size: 3em;
  color: #fff !important;
}
.leader-row{
  border-radius: 4px;
}
.leader-text{
  font-size: 1.1em;
  color: #fff;
}
.leaderboard-table{
  background-color: inherit !important;
}
.pagination .page-item .page-link{
  background-color: #1F2331 !important;
  color: white !important;
  border:none !important;
  font-size: 1.3rem;
}
.image-leader{
  width: 80px !important;
  height: 80px !important;
  border:2.5px solid yellow;
  border-radius: 50%;
}
.discord-text{
  font-size: 0.7em;
  color: #a7a8aa;
  line-height: 2.0em;
  margin: 0 !important;
}
.name-text{
  position: relative;
  margin-bottom: .6em;
  font-weight: bold;
}
.title-text{
  font-size: 0.85em;
  color: #a7a8aa;
  margin-bottom: 0.3em;
}
.yellow-line {
margin: auto;
  top: 23px;
  bottom:0%;
  left: 0%;
  height: 3px;
  width: 100%;
  font-size: 0.75em;
  font-weight: 300;
  background: yellow;
}

.leaderboard-table table{
  border: transparent;
  margin: 0 !important;
  background-color: black !important;
}
.leaderboard-table tr{
  padding: 0.75em 1.25em;
  border: 0 !important;
  border-bottom: 15px solid black !important;
  border-top: 10px solid black !important;
  background-color: #343a40 !important;
}
.leaderboard-table thead{
  border: none;
  background-color: transparent !important;
}
.leaderboard-table thead tr td, .leaderboard-table thead tr th{
  background-color: black;
}
.leaderboard-table tbody tr td, .leaderboard-table tbody tr th{
  background-color: #343a40;
}
select{
  -webkit-appearance: none;
  -moz-appearance: none;
  background-position: 90% 50%;
  background-size: 1.2em;
  border: 1px solid #343a40!important;
  box-sizing: content-box !important;
  padding: 10px !important;
  
  margin-right: 1em !important;
  background-repeat: no-repeat;
  margin-right: 15px !important;
  color: white !important;
  background-color: #fff !important;
  background-image: url("./Arrowhead.png");
}
select option{
  background-color: inherit;
  font-size: 1em !important;
  padding: 1em !important;
}

select option:checked,
select option:hover {
  background-color: #343a40 !important;
}
option:not(:checked) {
  background-color: inherit !important;
}
.searchbar{
  margin-bottom: auto;
  margin-top: auto;
  background-color: #353b48;
  padding: 10px;
  }
  .search_input{
      color: white;
      border: 0;
      outline: 0;
      background: none;
      width: 70%;
      caret-color:transparent;
      line-height: 40px;
      transition: width 0.4s linear;
      }
      .search_icon{
          height: 40px;
          width: 3%;
          float: left;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          color:white;
          text-decoration:none;
          }


  .self-ml-board{
      margin-left: 1.8em !important;
  }
  .bg-dark1{
      background-color: #000 !important;
  }
  .profile-image{
      border-top-left-radius: 50% !important;
      border-bottom-left-radius: 50% !important;
  }
  
@media only screen and (max-width:1200px){
  body{
      font-size: 0.75em;
      line-height: 0.85em;
  }
  .topnav{
      margin:auto;
      padding: 0 1em !important;
      margin: 0 1em !important;
  }
}
@media only screen and (min-width:1201px) and (max-width:1536px){
  body{
      font-size: 1em;
      line-height: 1.2em;
  }
  .topnav{
      margin:auto 1.4em !important;
      padding: 0 1.2em !important;
  }
  
}

@media only screen and (min-width:1537px) and (max-width:1920px){
  body{
      font-size: 1.4em;
      line-height: 1.5em;
  }
  .topnav{
      margin:auto;
      padding: 0 2em !important;
  }
  #brand{
      width: 50px;
      height: 50px;
  }
  .nav-item{
      padding: 1.2em .4em !important;
  }
  .navbar-brand{
      font-size: 1.4em;
      line-height: 0.024;
  }
  .navbar-brand::after{
      top: 55px;
  }
  .nav-item{
      font-size: 1.2em;
      line-height: 1.2em;
  }
  .right-nav li a.btn{
      margin-top: 0.5em !important;
  }
  a.btn{
      font-size: 1em;
  }
  #clip{
      width: 250px;
      height: 250px;
  }
  div.specs-text h5.card-title{
      font-size: 1.3em !important;
  }
  
  .leaderboard-table tr, .leaderboard-table th{
      font-size: 1em !important;
      padding: 1em !important;
  }
  th p{
      font-size: 0.9em;
  }
  .leaderboard-table tr{
      padding:1em 1.45em !important;
  }
  .image-leader{
      width: 5.3em !important;
      height: 5.3em !important;
      border: 4px solid yellow;
  }
  .discord-text{
      font-size: 0.8em;
  }
  .name-text{
      font-size: 1.1em !important;
  }
  .name-text::after{
      top: 1.8em !important;
  }
  .title-text{
      font-size: 0.9em;
  }
}
@media only screen and (min-width:1921px) and (max-width:2485px){
  body{
      font-size: 1.7em;
      line-height: 1.8em;
  }
  .topnav{
      margin:auto;
      padding: 0 1.6em !important;
  }
  #brand{
      width: 65px;
      height: 65px;
  }
  .navbar-brand{
      font-size: 1.3em;
      line-height: 0.03em;
  }
  .nav-item{
      font-size: 1.5em;
      line-height: 1.2em;
  }
  .right-nav li{
      padding: 1.2em;
      padding: 1.2em 0.2em;
  }
  .right-nav li a.nav-link i.fa-cog{
      font-size: 1.4em;
  }
  .right-nav li a.btn{
      margin-top: 0.2em;
      font-size: 1.3em;
      padding: 0.3em;
  }
  .right-nav li a.btn i{
      font-size: 1em;
  }
  .right-nav li a .fa-wallet{
      margin:0 0.3em !important;
  }
  .right-nav li a .fa-chevron-down{
      margin: 0 0.3em !important;
  }
  #clip{
      width: 330px !important;
      height: 330px !important;
  }
  div.specs-text h5.card-title{
      font-size: 1.6em !important;
  }
  div.specs-text h5.card-title{
      font-size: 1.6em !important;
      padding: 0.52em !important;
      margin:-2em 0.5em 1rem !important;
  }
  p.specs{
      line-height: 1em !important;
      border-radius: 1em !important;
      font-size: 1.2em !important;
      padding: 0.5em !important;
      margin:0 1.1em 1.2em !important;
  }
  .mr-3{
      margin-right: 1.5em !important;
  }
  
  .mx-5{
      margin-left: 5.5em !important;
      margin-right: 5.5em !important;
  }
  .edit-icon{
      margin-top: 1em ;
  }
  .descrip p{
      font-size: 1.3em;
  }
  .descrip-text{
      font-size: 1em;
  }
  table th, table td{
      font-size: 1.1em;
      padding: 0.8em 1em !important;
  }
  .vl-warning{
      border-left: 0.3em solid #0ee9a8 !important;
  }
  .vl-danger{
      border-left: 0.3em solid #ff4747 !important;
  }
  .footer{
      padding: 0 2em;
  }
  .footer-text span{
      margin-left: 0.2em;
      font-size: 1.3em;
  }
  .footer-icons img{
      width: 1.3em;
      height: 1.3em;
  }
  .list-inline-item.mx-2{
      margin: 0 0.8em !important;
  }
  .leaderboard-table tr, .leaderboard-table th{
      font-size: 1.5em !important;
  }
  .image-leader{
      width: 6em !important;
      height: 6em !important;
      border: 4px solid yellow;
  }
  .discord-text{
      font-size: 0.8em;
  }
  .name-text{
      font-size: 1.2em !important;
  }
  .name-text::after{
      top: 1.9em !important;
  }
  .title-text{
      font-size: 0.95em;
  }
}
@media only screen and (min-width:2486px) and (max-width:4096px){
  body{
      font-size: 2.1em;
      line-height: 2.1em;
  }
  .topnav{
      margin:auto;
      padding: 0 2.2em !important;
      margin-left: 1em;
  }
  
  #brand{
      width: 90px;
      height: 90px;
  }
  .navbar-brand{
      font-size: 1.5em;
      line-height: 0.04em;
  }
  .navbar-brand::after{
      top: 3em;
  }
  .nav-item{
      font-size: 1.6em;
      line-height: 1.4em;
  }
  .right-nav li{
      padding: 1.44em 0.3em;
  }
  .right-nav li a.nav-link i.fa-cog{
      font-size: 1.4em;
  }
  .right-nav li a.btn{
      margin-top: 0.2em;
      font-size: 1.3em;
      padding: 0.3em;
  }
  .right-nav li a.btn i{
      font-size: 1em;
  }
  .right-nav li a .fa-wallet{
      margin:0 0.3em !important;
  }
  .right-nav li a .fa-chevron-down{
      margin: 0 0.3em !important;
  }
  #clip{
      width: 550px !important;
      height: 550px !important;
  }
  div.specs-text h5.card-title{
      font-size: 1.72em !important;
      padding: 0.7em !important;
      margin:-4em 0.7em 0 !important;
  }
  p.specs{
      line-height: 1.3em !important;
      border-radius: 1.3em !important;
      font-size: 1.4em !important;
      padding: 0.7em !important;
      margin:0 1.5em 1.5em !important;
  }
  .mr-3{
      margin-right: 2em !important;
  }
  .mx-5{
      margin-left: 7.5em !important;
      margin-right: 7.5em !important;
  }
  .edit-icon{
      margin-top: 1.2em ;
  }
  .edit-icon .fas{
      margin-right: 0.3em;
  }
  .edit-icon a{
      font-size: 1.4em;
  }
  .descrip p{
      font-size: 1.65em;
  }
  .description .descrip-text{
      font-size: 1.3em !important;
  }
  .description{
      padding-right: 2em !important;
      padding-left: 2rem !important;
  }
  .description .p-2{
      padding: 1.2em !important;
  }
  .description .p-md-3{
      padding: 1.5em !important;
  }
  div.social-icons.px-lg-5{
      padding-left: 4em !important;
      padding-right: 4em !important;
  }
  div.social-icons.py-md-2{
      padding-top: 1em  !important;
      padding-bottom: 1em  !important;
  }
  .description .social-icons p{
      font-size: 1.4em;
  }
  li.list-group-item{
      font-size: 1.3em;
      padding: 0.72em 0;
  }
  table th, table td{
      font-size: 1.5em;
      padding: 1em 1.2em !important;
  }
  .vl-warning{
      border-left: 0.3em solid #0ee9a8 !important;
  }
  .vl-danger{
      border-left: 0.3em solid #ff4747 !important;
  }
  .check{
      padding:0.2em 0.4em !important;
      padding-right: 0.4em !important;
  }
  .footer{
      padding: 0 3em;
  }
  .footer-text span{
      font-size: 1.6em;
  }
  .footer-icons img{
      width: 1.5em;
      height: 1.5em;
  }
  .list-inline-item.mx-2{
      margin: 0 1em !important;
  }
  select{
      font-size: 1em !important;
  }
  .search_icon{
      margin-top: 0.6em !important;
  }
  select option{
      font-size: 1em !important;
  }
  .image-leader{
      width: 7.27em !important;
      height: 7.27em !important;
      border: 5px solid yellow;
  }
  .discord-text{
      font-size: 0.9em;
  }
  .name-text{
      font-size: 1.4em !important;
  }
  .name-text::after{
      height: 0.1em;
      top: 2.3em !important;
  }
  .title-text{
      font-size: 1em;
  }

}




.logo-div img{
width: 40px;
height: 40px;
}
.footer{
  padding: 0 1.5em;
}
.footer-text{
  margin-left: 0.3em;
}
.descrip-text{
  font-size: 0.8em;
}
/* navbar */
.navbar .navbar-nav .nav-link{
  color: #fff !important;
  position: relative;
}
.right-nav{
  float: right ;
}
.right-nav li{
  padding: 1em;
}
.right-nav li i.fa-cog{
  font-size: 1em;
}
.navbar .navbar-nav .nav-link::after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #6822b8;
  color: transparent;
  width: 0%;
  content: '.';
  height: 0.2em;
}
.navbar .navbar-nav .nav-link {
  transition: all 0.5s;
}
.navbar .navbar-nav .nav-link.active::after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #6822b8;
  color: transparent;
  width: 100%;
  float: left;
  margin: auto;
  content: '.';
  height: 0.2em;
}

#clip{
  width: 250px;
  height: 250px;
}
.navbar .navbar-nav .nav-link:hover::after {
  width: 100%;
  float: left;
}
@media only screen and (min-width: 960px) {
  .navbar .navbar-nav .nav-link {
    padding: 1em 0.7em;
  }
  .navbar {
    padding: 0;
  }
  .navbar .navbar-brand {
    padding: 0 0.7em;
  }
}
/* Navbar end*/
div.card-body-image{
  position: relative;
  height: auto;
}
.border-primary{
  border: 0.1em solid #6822b8 !important;
}
.card-body{
  padding: 0%;
}
#clip{
  position: relative;
  top: 0;
  left: 50%;
  display: block;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border: 10px solid black;
}
div.card-body-image img::after{
  width: 0%;
  height: 0%;
}
div.col-md-4 .mr-10{
  margin-right: 0.7em;
}
div.col-md-10 .ml-10{
  margin-left: 0.7em;
}
p{
  display: inline-block;
}
p.specs{
  line-height: 0.6em;
  border-radius: 0.9em;
  font-size: 0.95em;
  background-color: #522ebd;
  padding: 0.6em;
  margin:0 1em 1em;
}
div.specs-text{
 margin-top: -100px !important;
 padding: 0 1em !important;
}

.list-group-item{
  padding: 0.4rem 0;
  margin: 0.35em 0;
  background-color: inherit;
  color: white;
  border: none !important;
}
.putbg-image{
  background-image: url('./icons/profiler.png');
  background-attachment: fixed;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
background-size: 100% 100%;
}
.list-group-item i{
  margin-right: 0.7em;
}
.left-div{
  box-shadow: -.5px -.5px 0 .5px #0d6efd, inset -1px -1px 0 0 #0d6efd;
}
.mr-10{
  margin-right: 10px;
}
table{
  border: 1px solid #0d6efd;
  border-bottom: none;
}
thead{
  border-bottom: 1px solid #0d6efd !important;
}
tbody{
  border:none !important;
}
.bg-warning{
  background-color: #0ee9a8 !important;
}
.text-warning{
  color: #0ee9a8 !important;
}
.text-danger{
  color: #ff4747 !important;
}
.bg-danger{
  background-color: #ff4747 !important;
}

.vertical-line-icon {
  display: table;
  height: 50px;
}
.vl-warning{
  border-left: 3px solid #0ee9a8;
  height: 25px;
  margin-right: 20px;
  padding: 6px 0;  
}
.vl-danger {
  border-left: 3px solid #ff4747;
  height: 25px;
  margin-right: 20px;
  padding: 6px 0px;
}
.vertical-line-icon:after {
  content: '';
  display: table;
  margin: 0 auto;
  width: 4px;
  height: 100%;
  background-color: white;
  margin-right: 35px !important;
}
th{
  padding-left:30px !important;
  padding-right:0;
  padding-top: 15px !important;
  padding-bottom: 15px !important;
}
td{
    padding: 15px 10px !important;
}
.margin-nav-auto{
    margin: auto;
}

@media (max-width: 1100px)
{
  #clip{
      width: 140px;
      height: 140px;
      top: -20px;
  }
  div.specs-text h5{
      margin-top: 40px;
   }
}

@media (max-width: 770px)
{
  #clip{
      width: 90px;
      height: 90px;
      border: 5px solid black;
  }
  .mr-10{
      margin-right: 0px;
  }
  div.col-md-4 .mr-10{
      margin-right: 0px;
  }
  .social-icons{
      justify-content: left;
      margin-left: 10px;
  }
  .social-analysis-icons{
      justify-content: center;
      margin-left: 10px;
  }
  .main-div{
      margin-bottom: 20px;
  }
  .h-analytics{
      margin-bottom: 20px;
  }
  .footer-icons{
      justify-content: center;
  }
  .footer-text{
      justify-content: center;
  }
  .right-nav{
      float: left;
      margin-right: 0;
      margin-left: 17px;
  }
  .margin-nav-auto{
      margin: auto 0 auto 10px;
  }
  .navbar .navbar-nav .nav-link:hover::after {
      width: 70px;
      margin: 0;
      margin-right: auto;
    }
    
  .navbar .navbar-nav .nav-link.active::after {
      width: 70px;
      margin: 0;
      margin-right: auto;
    }
    .discord-text{
      margin-bottom: 1em !important;
  }
  .name-text{
      margin-bottom: 1em !important;
  }
  .name-text::after{
      top: 15px !important;
  }
  .image-leader{
      width: 55px !important;
      height: 55px !important;
  }
  .leader-row{
      margin: 1em 1em !important;
      
  }
  select{
      margin-bottom: 1em !important;
  }
  select option {
      font-size: 0.8em !important;
      padding: 0 !important;
  }
  .leaderboar-form{
      padding: 0px !important;
      margin: 1em !important;
  }
  .search_icon{
    width: 14%;
  }
  .leftbtn div{
      margin-right: 5px !important;
  }
  .rightbtn div{
      margin-left: 5px !important;
  }
  .leftbtn div .form-control{
      padding: 0px;
      margin-right: 5px;
  }
  select{
      padding: 0px !important;
  }
  .topnav{
      margin: 0px !important;
      padding: 0px !important;
  }
  .searchbar{
      padding: 0px !important;
  }
  .footer-icons{
      margin-top: 15px;
  }
  .leader-heading{
      font-size: 2em;
  }
  .leader-text{
      font-size: 0.95em;
  }
}
@media (max-width:500px) {
  #clip{
      width: 90px;
      height: 90px;
      top: -10px;
      border: 4px ;
  }
  .right-icon{
      transform: translate(55%,25%) !important;
      width: 100% !important;
      height: 100% !important;
  }
.search_icon{
    width: 14% !important;
  }
  
  
}

`;

