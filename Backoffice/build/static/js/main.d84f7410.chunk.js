(this.webpackJsonpgpe=this.webpackJsonpgpe||[]).push([[0],{117:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a(1),l=a.n(n),i=a(18),c=a.n(i),r=(a(57),a(9)),o=a(10),d=a(12),h=a(11),u=(a(21),a(58),a(59),a(60),a(23)),b=a(8),j=a(19),p=a(2),x=a(4),f=a(5),O=a(7),m=a(20),y="http://54.160.33.104:80/api/",g=a(92),v=a(28),C=a(49),I=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return Object(s.jsxs)("span",{className:"p-input-icon-left",children:[Object(s.jsx)("i",{className:"pi pi-search"}),Object(s.jsx)(x.InputText,Object(C.a)({value:this.props.getValue,onChange:function(t){return e.props.onChange(t)},placeholder:this.props.getPlaceholder},"placeholder","Search"))]})}}]),a}(n.Component),A=a(24),k=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var l;return Object(r.a)(this,a),(l=t.call(this,e)).getLots=function(){g.get(y+"Lots").then((function(e){l.setState({allLots:e.data}),l.setState({lots:e.data})})),l.getArticleIds()},l.getArticleIds=function(){g.get(y+"Articles/BackOffice").then((function(e){var t=[];e.data.forEach((function(e){t.push(e.ArticleId)})),l.setState({allArticleId:t}),console.log(t)}))},l.updateLot=function(){var e={ArticleId:l.state.articleId,LotId:l.state.lotId,stock:l.state.stock};g.put(y+"Lots",e).then((function(e){l.visibleHandler(),l.getLots(),l.clearInputs()}))},l.checkIputs=function(){return""!=l.state.stock&&""!=l.state.articleId&&""!=l.state.lotId},l.addLots=function(){if(l.checkIputs()){var e={ArticleId:l.state.articleId,LotId:l.state.lotId,stock:l.state.stock};g.post(y+"Lots",e).then((function(e){l.getLots(),l.clearInputs(),l.setState({activeIndex:0})}))}else alert("You have to introduce all fields")},l.lotIdHandler=function(e){l.setState({lotId:e.target.value})},l.stockHandler=function(e){l.setState({stock:e.target.value})},l.articleIdHandler=function(e){l.setState({articleId:e.target.value},console.log(e.target.value))},l.filterHandler=function(e){l.setState({filter:e.target.value},(function(){l.filter(),console.log(l.state.filter)}))},l.filter=function(){var e=[];""===l.state.filter?l.setState({lots:l.state.allLots}):(l.state.allLots.forEach((function(t){var a=l.state.filter.toUpperCase();(t.ArticleId==a||t.LotId.toUpperCase().includes(a))&&e.push(t)})),l.setState({lots:e}))},l.changePage=function(e){return Object(s.jsx)(f.Button,{label:"Modify",icon:"pi pi-pencil",onClick:function(){return l.showInputs(e)},className:"p-button-secondary p-mr-2",style:{backgroundColor:"#86AEC2"}})},l.visibleHandler=function(){l.setState({visible:!l.state.visible})},l.showInputs=function(e){l.visibleHandler(),console.log(e),l.setState({lotId:e.LotId}),l.setState({stock:e.Stock},(function(){return console.log(l.state.stock)})),l.setState({articleId:e.ArticleId})},l.clearInputs=function(){l.setState({lotId:""}),l.setState({stock:""}),l.setState({articleId:""})},l.GPEAlert=Object(n.createRef)(),l.state={lots:[],allLots:[],date:"",filter:"",lotId:"",articleId:"",allArticleId:[],stock:0,visible:!0,activeIndex:0},l}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.getLots()}},{key:"render",value:function(){var e=this;return Object(s.jsxs)(n.Fragment,{children:[Object(s.jsx)(m.Toast,{ref:this.GPEAlert}),Object(s.jsxs)(O.TabView,{activeIndex:this.state.activeIndex,onTabChange:function(t){return e.setState({activeIndex:t.index})},children:[Object(s.jsx)(O.TabPanel,{header:"Lots",children:!0===this.state.visible?Object(s.jsxs)("div",{children:[Object(s.jsxs)("div",{className:"flexCenter",children:[Object(s.jsx)(I,{onChange:this.filterHandler}),Object(s.jsx)(f.Button,{label:"Actualizar",icon:"pi pi-refresh",onClick:this.getLots,className:"p-button-secondary p-mr-2",style:{backgroundColor:"#86AEC2"}})]}),Object(s.jsx)("div",{children:Object(s.jsxs)(j.DataTable,{value:this.state.lots,children:[Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"12%"},field:"ArticleId",header:"ArticleId"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"9%"},field:"LotId",header:"LotId"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"11%"},field:"Stock",header:"Stock"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"11%"},body:this.changePage,field:"Modify",header:"Modify"})]})})]}):Object(s.jsxs)("div",{children:[Object(s.jsx)(A.Dropdown,{value:this.state.articleId,options:this.state.allArticleId,onChange:this.articleIdHandler,disabled:!0,placeholder:"Select a Id"}),Object(s.jsx)(x.InputText,{value:this.state.lotId,disabled:!0,onChange:this.lotIdHandler,placeholder:"Lot Id",style:{width:"220px"}}),Object(s.jsx)(x.InputText,{value:this.state.stock,onChange:this.stockHandler,placeholder:"Stock Number",style:{width:"220px"}}),Object(s.jsx)(f.Button,{label:"Modify",icon:"pi pi-send",onClick:this.updateLot,className:"p-button-secondary p-mr-2",style:{backgroundColor:"#77FF94",color:"black"}})]})}),Object(s.jsx)(O.TabPanel,{header:"New Lot",children:Object(s.jsxs)("div",{className:"flexCenter",children:[Object(s.jsxs)("div",{children:[Object(s.jsx)(A.Dropdown,{value:this.state.articleId,options:this.state.allArticleId,onChange:this.articleIdHandler,placeholder:"Select a Id",className:""==this.state.articleId&&"p-invalid p-d-block"}),Object(s.jsx)(x.InputText,{value:this.state.lotId,onChange:this.lotIdHandler,placeholder:"Lot Id",style:{width:"220px"},className:""==this.state.lotId&&"p-invalid p-d-block"}),Object(s.jsx)(x.InputText,{value:this.state.stock,onChange:this.stockHandler,placeholder:"Stock Number",style:{width:"220px"},className:""==this.state.stock&&"p-invalid p-d-block"})]}),Object(s.jsx)("div",{className:"flexCenter",children:Object(s.jsx)(f.Button,{label:" New Lot",icon:"pi pi-plus-circle",onClick:this.addLots,className:"p-button-secondary p-mr-2",style:{backgroundColor:"#77FF94",color:"black"}})})]})})]})]})}}]),a}(n.Component),E=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var l;return Object(r.a)(this,a),(l=t.call(this,e)).getArticles=function(){g.get(y+"Articles/BackOffice").then((function(e){l.setState({articles:e.data}),l.setState({allArticles:e.data})}))},l.updateArticle=function(){var e={ArticleId:l.state.articleId,Description:l.state.description,Price:l.state.price,Brand:l.state.brand,Category:l.state.category,Iva:l.state.iva};g.put(y+"Articles",e).then((function(e){l.visibleHandler(),l.getArticles(),l.clearInputs()}))},l.checkIputs=function(){return""!=l.state.description&&""!=l.state.price&&""!=l.state.brand&&""!=l.state.category&&""!=l.state.iva},l.addArticle=function(){if(l.checkIputs()){var e={ArticleId:l.state.articleId,Description:l.state.description,Price:l.state.price,Brand:l.state.brand,Category:l.state.category,Iva:l.state.iva,Enabled:!1};g.post(y+"Articles",e).then((function(e){l.getArticles(),l.clearInputs(),l.setState({activeIndex:0})}))}else alert("You have to introduce all fields")},l.articleIdHandler=function(e){l.setState({articleId:e.target.value})},l.descriptionHandler=function(e){l.setState({description:e.target.value})},l.priceHandler=function(e){l.setState({price:e.target.value})},l.brandHandler=function(e){l.setState({brand:e.target.value})},l.categoryHandler=function(e){l.setState({category:e.target.value})},l.ivaHandler=function(e){l.setState({iva:e.target.value})},l.filterHandler=function(e){l.setState({filter:e.target.value},(function(){l.filter()}))},l.filter=function(){var e=[];""===l.state.filter?l.setState({articles:l.state.allArticles}):(l.state.allArticles.forEach((function(t){var a=l.state.filter.toUpperCase();(t.ArticleId==a||t.Description.toUpperCase().includes(a)||t.Brand.toUpperCase().includes(a)||t.Category.toUpperCase().includes(a)||t.Price==a||t.Iva==a)&&e.push(t)})),l.setState({articles:e}))},l.showEnable=function(){var e=[];l.state.allArticles.forEach((function(t){1==t.Enabled&&e.push(t)})),l.setState({articles:e},(function(){l.setState({show:!l.state.show})}))},l.showDisable=function(){var e=[];l.state.allArticles.forEach((function(t){0==t.Enabled&&e.push(t)})),l.setState({articles:e},(function(){l.setState({show:!l.state.show})}))},l.changePage=function(e){return Object(s.jsx)(f.Button,{label:"Modify",icon:"pi pi-pencil",onClick:function(){return l.showInputs(e)},className:"p-button-secondary p-mr-2",style:{backgroundColor:"#86AEC2"}})},l.visibleHandler=function(){l.setState({visibleModify:!l.state.visibleModify})},l.showInputs=function(e){l.visibleHandler(),console.log(e),l.setState({articleId:e.ArticleId}),l.setState({description:e.Description}),l.setState({price:e.Price}),l.setState({brand:e.Brand}),l.setState({category:e.Category}),l.setState({iva:e.Iva})},l.clearInputs=function(){l.setState({articleId:""}),l.setState({description:""}),l.setState({price:""}),l.setState({brand:""}),l.setState({category:""}),l.setState({iva:""})},l.btnActive=function(e){return Object(s.jsx)(s.Fragment,{children:e.Enabled?Object(s.jsx)(f.Button,{label:"YES",onClick:function(){return l.changeArticle(e)},className:"p-button-success"}):Object(s.jsx)(f.Button,{label:"NO",onClick:function(){return l.changeArticle(e)},className:" p-button-danger"})})},l.changeArticle=function(e){g.put(y+"Articles/"+e.ArticleId).then((function(){return l.getArticles()}))},l.GPEAlert=Object(n.createRef)(),l.state={articles:[],allArticles:[],articleId:"",description:"",price:"",brand:"",category:"",iva:"",activeIndex:0,enabled:!1,visible:!0,show:!0,visibleModify:!1},l}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.getArticles()}},{key:"render",value:function(){var e=this;return Object(s.jsxs)(n.Fragment,{children:[Object(s.jsx)(m.Toast,{ref:this.GPEAlert}),Object(s.jsxs)(O.TabView,{activeIndex:this.state.activeIndex,onTabChange:function(t){return e.setState({activeIndex:t.index})},children:[Object(s.jsx)(O.TabPanel,{header:"Articles",children:this.state.visibleModify?Object(s.jsxs)("div",{children:[Object(s.jsx)(x.InputText,{value:this.state.articleId,disabled:!0,onChange:this.articleIdHandler,placeholder:"Articulo ID",style:{width:"100px"}}),Object(s.jsx)(x.InputText,{value:this.state.description,onChange:this.descriptionHandler,placeholder:"Description",style:{width:"200px"}}),Object(s.jsx)(x.InputText,{value:this.state.price,onChange:this.priceHandler,placeholder:"Price",style:{width:"200px"}}),Object(s.jsx)(x.InputText,{value:this.state.brand,onChange:this.brandHandler,placeholder:"Brand",style:{width:"200px"}}),Object(s.jsx)(x.InputText,{value:this.state.category,onChange:this.categoryHandler,placeholder:"Category",style:{width:"200px"}}),Object(s.jsx)(x.InputText,{value:this.state.iva,onChange:this.ivaHandler,placeholder:"Iva",style:{width:"200px"}}),Object(s.jsx)(f.Button,{label:"Modify",icon:"pi pi-send",onClick:this.updateArticle,className:"p-button-secondary p-mr-2",style:{backgroundColor:"#77FF94",color:"black"}})]}):Object(s.jsxs)("div",{children:[Object(s.jsxs)("div",{className:"flexCenter",children:[Object(s.jsx)(I,{onChange:this.filterHandler}),this.state.show?Object(s.jsx)(f.Button,{label:"Show Enable",onClick:this.showEnable,className:"p-button-secondary p-mr-2",icon:"pi pi-eye",style:{backgroundColor:"#86AEC2"}}):Object(s.jsx)(f.Button,{label:"Show Disable",onClick:this.showDisable,className:"p-button-secondary p-mr-2",icon:"pi pi-eye",style:{backgroundColor:"#86AEC2"}}),Object(s.jsx)(f.Button,{label:"Actualizar",icon:"pi pi-refresh",onClick:this.getArticles,className:"p-button-secondary p-mr-2",style:{backgroundColor:"#86AEC2"}})]}),Object(s.jsx)("div",{children:Object(s.jsxs)(j.DataTable,{value:this.state.articles,children:[Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"15%"},field:"ArticleId",header:"ArticleId"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"25%"},field:"Description",header:"Description"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"15%"},field:"Price",header:"Price"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"25%"},field:"Brand",header:"Brand"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"25%"},field:"Category",header:"Category"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"10%"},field:"Iva",header:"Iva"}),Object(s.jsx)(p.Column,{body:this.btnActive,style:{textAlign:"center",width:"10%"},field:"Enabled",header:"Enabled"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"25%"},body:this.changePage,field:"Modify",header:"Modify"})]})})]})}),Object(s.jsxs)(O.TabPanel,{header:"New Articles",children:[Object(s.jsx)(x.InputText,{value:this.state.description,onChange:this.descriptionHandler,placeholder:"Description",style:{width:"200px"}}),Object(s.jsx)(x.InputText,{value:this.state.price,onChange:this.priceHandler,placeholder:"Price",style:{width:"200px"}}),Object(s.jsx)(x.InputText,{value:this.state.brand,onChange:this.brandHandler,placeholder:"Brand",style:{width:"200px"}}),Object(s.jsx)(x.InputText,{value:this.state.category,onChange:this.categoryHandler,placeholder:"Category",style:{width:"200px"}}),Object(s.jsx)(x.InputText,{value:this.state.iva,onChange:this.ivaHandler,placeholder:"Iva",style:{width:"200px"}}),Object(s.jsx)(f.Button,{label:" New Lot",icon:"pi pi-plus-circle",onClick:this.addArticle,className:"p-button-secondary p-mr-2",style:{backgroundColor:"#77FF94",color:"black"}})]})]})]})}}]),a}(n.Component),w=a(29),N=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(r.a)(this,a),(s=t.call(this,e)).getBetsDate=function(){g.get(y+"Apuestas/GetFechas").then((function(e){s.setState({betsDate:e.data})}))},s.getBetsCount=function(){g.get(y+"Apuestas/GetAltas").then((function(e){s.setState({betsCount:e.data})}))},s.getUsersDate=function(){g.get(y+"Usuarios/GetFechas").then((function(e){s.setState({usersDate:e.data})}))},s.getUsersCount=function(){g.get(y+"Usuarios/GetAltas").then((function(e){s.setState({usersCount:e.data})}))},s.state={betsDate:[],betsCount:[],usersDate:[],usersCount:[]},s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.getBetsDate(),this.getBetsCount(),this.getUsersDate(),this.getUsersCount()}},{key:"render",value:function(){var e={labels:this.state.betsDate,datasets:[{label:"Apuestas",data:this.state.betsCount,fill:!1,borderColor:"#42A5F5",backgroundColor:"#393e46"}]},t={labels:this.state.usersDate,datasets:[{label:"Usuarios",data:this.state.usersCount,fill:!1,borderColor:"#42A5F5",backgroundColor:"#393e46"}]},a={legend:{labels:{fontColor:"#42A5F5"}},scales:{xAxes:[{ticks:{fontColor:"#00adb5"}}],yAxes:[{ticks:{fontColor:"#00adb5"}}]}};return Object(s.jsx)(n.Fragment,{children:Object(s.jsxs)(O.TabView,{children:[Object(s.jsx)(O.TabPanel,{header:"Apuestas",children:Object(s.jsx)("div",{className:"chartView",children:Object(s.jsx)(w.Chart,{className:"chart",type:"line",data:e,options:a,width:"850%"})})}),Object(s.jsx)(O.TabPanel,{header:"Usuarios",children:Object(s.jsx)("div",{className:"chartView",children:Object(s.jsx)(w.Chart,{className:"chart",type:"line",data:t,options:a,width:"850%"})})})]})})}}]),a}(n.Component),S=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return Object(s.jsx)(n.Fragment,{children:Object(s.jsx)(f.Button,{label:this.props.getLabel,icon:this.props.getIcon,className:this.props.getClassName})})}}]),a}(n.Component),T=a(28),D=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(r.a)(this,a),(s=t.call(this,e)).getClients=function(){g.get(y+"Clients").then((function(e){e.data.forEach((function(e){e.RegisterDate=T(e.RegisterDate).format("YYYY-MM-DD"),!0===e.Enabled?e.Enabled="Yes":e.Enabled="No"})),s.setState({clients:e.data})}))},s.GPEAlert=Object(n.createRef)(),s.state={clients:[]},s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.getClients()}},{key:"render",value:function(){return Object(s.jsxs)(n.Fragment,{children:[Object(s.jsx)(m.Toast,{ref:this.GPEAlert}),Object(s.jsxs)(O.TabView,{children:[Object(s.jsx)(O.TabPanel,{header:"Clients",children:Object(s.jsxs)("div",{className:"flexCenter",children:[Object(s.jsx)(x.InputText,{value:this.state.email,onChange:this.handlerEmail,disabled:this.state.name||this.state.surname,placeholder:"Email",style:{width:"40%",marginLeft:"1%"}}),Object(s.jsx)(S,{getIcon:"pi pi-refresh",onClick:this.resetStates,variant:"outlined",className:"p-GPEButton-warning"}),Object(s.jsx)(S,{getLabel:"Filtrar",icon:"pi pi-filter",onClick:this.GPEButtonFilter,className:"p-GPEButton-warning",style:{width:"15%",marginLeft:"1%",marginRight:"1%"}})]})}),Object(s.jsx)(O.TabPanel,{header:"Add New Client",children:Object(s.jsxs)("div",{className:"flexCenter",children:[Object(s.jsx)(x.InputText,{value:this.state.email,onChange:this.handlerEmail,placeholder:"Email",style:{width:"40%"}}),Object(s.jsx)(S,{GetLabel:"Eliminar",icon:"pi pi-trash",onClick:this.deleteUsers,className:"p-GPEButton-secondary p-mr-2"})]})}),Object(s.jsx)(O.TabPanel,{header:"Modify Client",children:Object(s.jsxs)("div",{className:"flexCenter",children:[Object(s.jsx)(x.InputText,{value:this.state.email,onChange:this.handlerEmail,placeholder:"Email",style:{width:"30%"}}),Object(s.jsx)(x.InputText,{type:"password",value:this.state.oldPwd,onChange:this.handlerOldPwd,placeholder:"Contrase\xf1a anterior",style:{width:"30%"}}),Object(s.jsx)(S,{label:"Confirmar",onClick:this.changePassword,className:"p-GPEButton-secondary p-mr-2",style:{width:"30%"}})]})})]}),Object(s.jsx)("div",{children:Object(s.jsxs)(j.DataTable,{value:this.state.clients,children:[Object(s.jsx)(p.Column,{field:"ClientId",header:"ClientId",style:{textAlign:"center"}}),Object(s.jsx)(p.Column,{field:"Name",header:"Name",style:{textAlign:"center"}}),Object(s.jsx)(p.Column,{field:"Address",header:"Address",style:{textAlign:"center"}}),Object(s.jsx)(p.Column,{field:"City",header:"City",style:{textAlign:"center"}}),Object(s.jsx)(p.Column,{field:"Province",header:"Province",style:{textAlign:"center"}}),Object(s.jsx)(p.Column,{field:"Phone",header:"Phone",style:{textAlign:"center"}}),Object(s.jsx)(p.Column,{field:"NIF",header:"NIF",style:{textAlign:"center"}}),Object(s.jsx)(p.Column,{field:"ContactName",header:"ContactName",style:{textAlign:"center"}}),Object(s.jsx)(p.Column,{field:"RegisterDate",header:"RegisterDate",style:{textAlign:"center"}}),Object(s.jsx)(p.Column,{field:"Enabled",header:"Enabled",style:{textAlign:"center"}})]})})]})}}]),a}(n.Component),P=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var l;return Object(r.a)(this,a),(l=t.call(this,e)).nameHandler=function(e){l.setState({name:e.target.value})},l.typeHandler=function(e){l.setState({type:e.target.value})},l.enabledHandler=function(e){l.setState({enabled:e.target.value})},l.clearInputs=function(){l.setState({name:""}),l.setState({type:""})},l.checkIputs=function(){return""!=l.state.name&&""!=l.state.type&&""!=l.state.enabled},l.btnActive=function(e){return console.log(e.Enabled),Object(s.jsx)(s.Fragment,{children:"Yes"==e.Enabled?Object(s.jsx)(f.Button,{label:"YES",onClick:function(){return l.changeEmployee(e)},className:"p-button-success"}):Object(s.jsx)(f.Button,{label:"NO",onClick:function(){return l.changeEmployee2(e)},className:" p-button-danger"})})},l.addEmployee=function(){if(l.checkIputs()){var e={Name:l.state.name,Type:l.state.type,Enabled:0};g.post(y+"Employees",e).then((function(e){l.getEmployees(),l.clearInputs(),l.setState({activeIndex:0})}))}else alert("You have to introduce all fields")},l.getEmployees=function(){g.get(y+"Employees/BackOffice").then((function(e){e.data.forEach((function(e){!0===e.Enabled?e.Enabled="Yes":e.Enabled="No"})),l.setState({employees:e.data}),l.setState({allEmployees:e.data})}))},l.filterHandler=function(e){l.setState({filter:e.target.value},(function(){l.filter(),console.log(l.state.filter),console.log(l.state.allEmployees)}))},l.changeEmployee=function(e){g.put(y+"Employees/"+e.EmployeeId,{Name:e.Name,Type:e.Type,Enabled:!1}).then((function(){return l.getEmployees()}))},l.changeEmployee2=function(e){l.state.name,l.state.type,l.state.enabled;g.put(y+"Employees/"+e.EmployeeId,{Name:e.Name,Type:e.Type,Enabled:!0}).then((function(){return l.getEmployees()}))},l.updateEmployee=function(){var e={Name:l.state.name,Type:l.state.type};g.put(y+"Employees/"+l.state.employeeId,e).then((function(e){l.visibleHandler(),l.getEmployees(),l.clearInputs()}))},l.visibleHandler=function(){l.setState({visible:!l.state.visible})},l.showInputs=function(e){l.visibleHandler(),console.log(e),l.setState({employeeId:e.EmployeeId}),l.setState({name:e.Name},(function(){return console.log(l.state.name)})),l.setState({enabled:e.Enabled})},l.filter=function(){var e=[];""===l.state.filter?l.setState({employees:l.state.allEmployees}):(l.state.allEmployees.forEach((function(t){l.state.filter.toUpperCase();(t.EmployeeId==l.state.filter||t.Name.toUpperCase().includes(l.state.filter.toUpperCase())||t.Type.toUpperCase().includes(l.state.filter.toUpperCase())||t.Enabled.toUpperCase().includes(l.state.filter.toUpperCase()))&&e.push(t)})),l.setState({employees:e}))},l.changePage=function(e){return Object(s.jsx)(f.Button,{label:"Modify",icon:"pi pi-pencil",onClick:function(){return l.showInputs(e)},className:"p-button-secondary p-mr-2",style:{backgroundColor:"#86AEC2"}})},l.GPEAlert=Object(n.createRef)(),l.state={employees:[],allEmployees:[],name:"",type:"",enabled:"",types:["Salesman","Deliverer"],enabledOptions:["true","false"],visible:!0,employeeId:""},l}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.getEmployees()}},{key:"render",value:function(){return Object(s.jsxs)(n.Fragment,{children:[Object(s.jsx)(m.Toast,{ref:this.GPEAlert}),Object(s.jsxs)(O.TabView,{children:[Object(s.jsx)(O.TabPanel,{header:"Employees Filter",children:!0===this.state.visible?Object(s.jsxs)("div",{children:[Object(s.jsxs)("div",{className:"flexCenter",children:[Object(s.jsx)(I,{onChange:this.filterHandler}),Object(s.jsx)(f.Button,{label:"Actualizar",icon:"pi pi-refresh",onClick:this.resetStates,className:"p-button-secondary p-mr-2",style:{backgroundColor:"#86AEC2"}})]}),Object(s.jsx)("div",{children:Object(s.jsxs)(j.DataTable,{value:this.state.employees,children:[Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"12%"},field:"EmployeeId",header:"EmployeeId"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"9%"},field:"Name",header:"Name"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"11%"},field:"Type",header:"Type"}),Object(s.jsx)(p.Column,{body:this.btnActive,style:{textAlign:"center",width:"10%"},field:"Enabled",header:"Enabled"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"11%"},body:this.changePage,field:"Modify",header:"Modify"})]})})]}):Object(s.jsxs)("div",{children:[Object(s.jsx)(x.InputText,{value:this.state.name,onChange:this.nameHandler,placeholder:"Name",style:{width:"220px"}}),Object(s.jsx)(A.Dropdown,{value:this.state.type,options:this.state.types,placeholder:"Select Type",onChange:this.typeHandler}),Object(s.jsx)(f.Button,{label:"Modify",icon:"pi pi-send",onClick:this.updateEmployee,className:"p-button-secondary p-mr-2",style:{backgroundColor:"#77FF94",color:"black"}})]})}),Object(s.jsx)(O.TabPanel,{header:"New Employees",children:Object(s.jsxs)("div",{children:[Object(s.jsx)(x.InputText,{value:this.state.name,onChange:this.nameHandler,placeholder:"Name",style:{width:"220px"}}),Object(s.jsx)(A.Dropdown,{value:this.state.type,options:this.state.types,placeholder:"Select Type",onChange:this.typeHandler}),Object(s.jsx)(A.Dropdown,{value:this.state.enabled,options:this.state.enabledOptions,placeholder:"Select if is enabled",onChange:this.enabledHandler}),Object(s.jsx)(f.Button,{label:" New Lot",icon:"pi pi-plus-circle",onClick:this.addEmployee,className:"p-button-secondary p-mr-2",style:{backgroundColor:"#77FF94",color:"black"}})]})})]})]})}}]),a}(n.Component),L=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(r.a)(this,a),(s=t.call(this,e)).getOrders=function(){g.get(y+"Orders").then((function(e){e.data.forEach((function(e){e.Date=v(e.Date).format("YYYY-MM-DD"),e.DeriveryDate=v(e.Date).format("YYYY-MM-DD"),!0===e.Delivered?e.Delivered="Yes":e.Delivered="No",!0===e.Paid?e.Paid="Yes":e.Paid="No"})),s.setState({orders:e.data})}))},s.GPEAlert=Object(n.createRef)(),s.state={orders:[]},s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.getOrders()}},{key:"render",value:function(){return Object(s.jsxs)(n.Fragment,{children:[Object(s.jsx)(m.Toast,{ref:this.GPEAlert}),Object(s.jsx)(O.TabView,{children:Object(s.jsxs)(O.TabPanel,{header:"Orders",children:[Object(s.jsxs)("div",{className:"flexCenter",children:[Object(s.jsx)(x.InputText,{value:this.state.local,onChange:this.handlerLocal,placeholder:"Equipo local"}),Object(s.jsx)(x.InputText,{value:this.state.visitant,onChange:this.handlerVisitant,placeholder:"Equipo visitante"}),Object(s.jsx)(x.InputText,{value:this.state.date,onChange:this.handlerDate,disabled:this.state.eventId,placeholder:"Fecha: 2000-01-01 00:00:00",style:{width:"230px"}}),Object(s.jsx)(f.Button,{label:"Actualizar",icon:"pi pi-refresh",onClick:this.resetStates,className:"p-button-secondary p-mr-2",style:{backgroundColor:"#86AEC2"}}),Object(s.jsx)(f.Button,{label:"Filtrar",icon:"pi pi-filter",onClick:this.filterButton,className:"p-button-secondary p-mr-2"})]}),Object(s.jsx)("div",{children:Object(s.jsxs)(j.DataTable,{value:this.state.orders,children:[Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"15%"},field:"OrderId",header:"OrderId"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"25%"},field:"ClientId",header:"ClientId"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"25%"},field:"OrderNum",header:"OrderNum"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"25%"},field:"Date",header:"Date"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"25%"},field:"DeriveryDate",header:"DeriveryDate"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"25%"},field:"ContactName",header:"ContactName"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"25%"},field:"Total",header:"Total"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"25%"},field:"Delivered",header:"Delivered"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"25%"},field:"Paid",header:"Paid"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"25%"},field:"PayingMethod",header:"PayingMethod"}),Object(s.jsx)(p.Column,{style:{textAlign:"center",width:"25%"},field:"EmployeeId",header:"EmployeeId"})]})})]})})]})}}]),a}(n.Component),H=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return Object(s.jsx)(u.a,{children:Object(s.jsxs)("div",{className:"container",children:[Object(s.jsx)("div",{className:"menu",children:Object(s.jsxs)("nav",{children:[Object(s.jsx)("div",{children:Object(s.jsx)(u.b,{to:"/articles",activeClassName:"selectedLink",className:"navLink",children:"Articles"})}),Object(s.jsx)("div",{children:Object(s.jsx)(u.b,{to:"/lots",activeClassName:"selectedLink",className:"navLink",children:"Lots"})}),Object(s.jsx)("div",{children:Object(s.jsx)(u.b,{to:"/orders",activeClassName:"selectedLink",className:"navLink",children:"Orders"})}),Object(s.jsx)("div",{children:Object(s.jsx)(u.b,{to:"/clients",activeClassName:"selectedLink",className:"navLink",children:"Clients"})}),Object(s.jsx)("div",{children:Object(s.jsx)(u.b,{to:"/employees",activeClassName:"selectedLink",className:"navLink",children:"Employees"})}),Object(s.jsx)("div",{children:Object(s.jsx)(u.b,{to:"/reports",activeClassName:"selectedLink",className:"navLink",children:"Reports"})})]})}),Object(s.jsx)("div",{className:"mainWindow",children:Object(s.jsxs)(b.c,{children:[Object(s.jsx)(b.a,{path:"/articles",children:Object(s.jsx)(E,{})}),Object(s.jsx)(b.a,{path:"/lots",children:Object(s.jsx)(k,{})}),Object(s.jsx)(b.a,{path:"/orders",children:Object(s.jsx)(L,{})}),Object(s.jsx)(b.a,{path:"/clients",children:Object(s.jsx)(D,{})}),Object(s.jsx)(b.a,{path:"/employees",children:Object(s.jsx)(P,{})}),Object(s.jsx)(b.a,{path:"/reports",children:Object(s.jsx)(N,{})})]})})]})})}}]),a}(n.Component),B=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,118)).then((function(t){var a=t.getCLS,s=t.getFID,n=t.getFCP,l=t.getLCP,i=t.getTTFB;a(e),s(e),n(e),l(e),i(e)}))};c.a.render(Object(s.jsx)(l.a.StrictMode,{children:Object(s.jsx)(H,{})}),document.getElementById("root")),B()},21:function(e,t,a){},57:function(e,t,a){}},[[117,1,2]]]);
//# sourceMappingURL=main.d84f7410.chunk.js.map