import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import cookie from '../../js/cookie/cookie';

//import Marker from 'marked';

const Login = React.createClass({

	getInitialState: function() {
		return {open: false,ac:'',pw:''};
	},

	handleOpen: function(){
		this.setState({open: true});
	},
	handleClose: function(){
		this.setState({open: false});
	},
	keyDown: function(event){
		var keynum;
		keynum = window.event ? event.keyCode : event.which;
		if (keynum == 13 ) {
			this.submit();
		}
	},
	submit: function(){
		this.handleClose();
		// name=Tmn07&pwd=q
		var self = this;
		$.post('/users/api/login',{name:this.state.ac,pwd:this.state.pw},function(result){
			//console.log(result);
			/*if (result.code == '200') {
			//已登录
				cookie.setCookieUser('userid',result.id)
				window.location.reload();
				return;
			}
			*/
			if (result[0].state == '1') {
				cookie.setCookieUser('userid',result[0].id)
				//window.location.reload();

				self.props.changeLogged();
			}
		});	
	},
	change_ac: function(event){
		this.setState({
			ac: event.target.value
		});
	},
	change_pw: function(event){
		this.setState({
			pw: event.target.value
		});
	},
	render: function(){
		const actions = [
			<FlatButton
				label="登陆"
				primary={true}
				keyboardFocused={true}
				onClick={this.submit}
			/>
		]
		const muiName = 'FlatButton';
		return ( 	
			<div id='login-container'>	
				<FlatButton 
					label="登陆" 
					style={{color:'white' , fontFamily: 'Roboto, sans-serif'}}
					onClick={this.handleOpen} 
				/>
				<Dialog
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
				账号
				<TextField
					hintText="账号"
					onChange = {this.change_ac}
				/><br />
				密码
				<TextField
					hintText="密码"
					type="password"
					onChange = {this.change_pw}
					onKeyDown={this.keyDown}
				/><br />
				</Dialog>	
			</div>
		)
	}
});

module.exports = Login;
