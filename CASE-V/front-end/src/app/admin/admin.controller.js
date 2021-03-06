export class AdminController {
  constructor ($http, $scope, API_URL) {
    'ngInject';

    this.API_URL = API_URL;
    this.$http = $http;
    this.$scope = $scope;
    this.tabs = [{Name: 'New User Requests', id: 1}, 
    {Name: 'User Privileges', id: 2}];
	this.$scope.currentTab = 1;    
	this.privileges = null;
	this.levels = null;
	this.users = null;
	this.getPrivileges();
	this.getUsers();

  }
  switchTab(tab)
  {
  	this.$scope.currentTab = tab;
  }  
  checkTab(tab)
  {
  	if(this.$scope.currentTab == tab)
  		return true;
  	else
  		return false;
  }
  //////////////////////User Privileges/////////////////////////////////////////////
  getPrivileges()
  {
  	var rr = this;
    this.$http.get(this.API_URL + '/api/privileges').then(function(result)
    {
        rr.privileges = result.data;
        rr.levels = rr.privileges["Levels"];
    });
  }
  deleteLevel(index)
  {
  	this.levels.splice(index, 1);
  }
  addLevel()
  {
  	this.levels.push("Level" + this.levels.length);
  }
  savePrivileges()
  {
  	var obj = {};
  	obj["Levels"] = this.levels;
  	for(var i = 0; i < this.levels.length; i++)
  	{
  		obj[this.levels[i]] = [];
  	}
  	console.log(obj);
  	var rr = this;
  	this.$http.post(this.API_URL + '/api/Privileges', {privileges : obj}).then(function(result)
  	{

  	})

  }
  ////////////////////////////User Verification////////////////////////////////////////////////
  getUsers()
  {
  	var rr = this;
  	this.$http.get(this.API_URL + '/api/unverified').then(function(result)
  	{
  		rr.users = result.data;
  	})
  }
  verifyUser(user)
  {
  	var rr = this;

  	this.$http.post(this.API_URL + '/api/assign', {user: user}).then(function(result)
  	{
  		
  	})
  	this.$http.post(this.API_URL + '/api/verify', {user: user}).then(function(result)
  	{
  		rr.getUsers();
  	})
  }
}
