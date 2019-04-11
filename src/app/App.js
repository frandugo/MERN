import React, { Component } from 'react';
import axios from 'axios';
class App extends Component{

	constructor(){
		super();
		this.state = {
			title: '',
			description: '',
			user: '',
			tasks: [],
			_id: ''
		}
		this.addTask = this.addTask.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		this.getTask();
	}
	async getTask(){
		await axios('/api/tasks')
					.then((response) => {
						console.log(response.data);
						this.setState({ tasks: response.data });
					}).catch(err => console.log(err));
	}

	addTask(e){
		if(this.state._id){
			axios.put(`/api/tasks/${ this.state._id }`, {
				title: this.state.title,
				description: this.state.description,
				_id: this.state._id
			}).then((response) => {
				M.toast({ html: 'Task Updated' });
				this.setState({ title: '', description: '', user: '' });
				this.getTask();
			})
		}else{
			axios.post('/api/tasks', {
				title: this.state.title,
				description: this.state.description,
				user: this.state.user
			})
			.then((response) => {
				M.toast({ html: 'Task Saved' });
				this.setState({ title: '', description: '', user: '' });
				this.getTask();
			})
			.catch((error) => {
				console.log(error);
			});
		}	
		e.preventDefault();
	}

	editTask(id){
		axios(`/api/tasks/${ id }`)
		.then((response) => {
			console.log('Id to be update', response.data);
			this.setState({
					title: response.data.title,
					description: response.data.description,
					_id: response.data._id
			});
		}).catch(err => console.log(err));
	}

	deleteTask(id){
		if(confirm('Are yo sure you want to delete?')){
			axios.delete(`/api/tasks/${ id }`)
			.then((response) => {
				M.toast({ html: 'Task Deleted' });
				this.getTask();
			})
			.catch((error) => {
				console.log(error);
			});
		}	
	}

	handleChange(e){
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	render(){
		return (
			<div>
				<nav className="light-blue darken-4">
					<div className="container">
						<a className="brand-logo" href="/">MERN STACK</a>
					</div>    
				</nav>
				<div className="container">
					<div className="row">
						<div className="col s5">
							<div className="card">
								<div className="card-content">
									<form onSubmit={this.addTask}>
										<div className="row">
											<div className="input-field col s12">
												<input name="title" onChange={ this.handleChange } type="text" value={ this.state.title } placeholder="Task Title"/>
											</div>
										</div>
										<div className="row">
											<div className="input-field col s12">
												<textarea name="description" onChange={ this.handleChange } className="materialize-textarea" value={ this.state.description } placeholder="Task Description"/>
											</div>
										</div>
										<div className="row">
											<div className="input-field col s12">
												<input name="user" onChange={ this.handleChange }  type="text" value={ this.state.user } placeholder="Task user" />
											</div>
										</div>
										<button className="btn light-blue darken-4" type="submit">Save</button> 
									</form>   
								</div>    
							</div>    
						</div>
						<div className="col s7">
							<table>
								<thead>
									<tr>
									  <th>#</th>
										<th>Title</th>
										<th>Description</th>
									</tr>
								</thead>	
								<tbody>
									{ 
										this.state.tasks.map( (task, index) => {
											return(
												<tr key={ index }>
													<td>{ index }</td>
													<td>{ task.title }</td>
													<td>{ task.description }</td>
													<td style={{ display: 'flex' }}>
														<button onClick={ () => this.editTask(task._id) } className="btn light-blue darken-4"><i className="material-icons">edit</i></button>
														<button onClick={ () => this.deleteTask(task._id) } style={{ marginLeft: '5px' }} className="btn light-blue darken-4"><i className="material-icons">delete</i></button>
													</td>
												</tr>	
											)
										})
									}
								</tbody>
							</table>	
						</div>
					</div>    
				</div>   
			</div>    
		)
	}
}

export default App;