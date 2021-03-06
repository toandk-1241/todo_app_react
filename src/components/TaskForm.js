import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false
    }
  }

  componentWillMount() {
    if(this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status
      });
    } else if(!nextProps.task) {
      this.setState({
        id: '',
        name: '',
        status: false
      });
    }
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    if(name === 'status') {
      value = target.value === 'true' ? true : false
    }

    this.setState({
      [name]: value
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    // this.props.onSubmit(this.state);
    this.props.onAddTask(this.state);
    this.onClear();
    this.onCloseForm();
  }

  onClear = () => {
    this.setState({
      name: '',
      status: false
    })
  }

  render() {
    var {id} = this.state

    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id === '' ? 'Them cong viec' : 'Cap nhat cong viec'}
            <span
              className="fa fa-times-circle pull-right"
              onClick={this.onCloseForm}></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Ten: </label>
              <input
                type="text"
                className="form-control"
                id=""
                name="name"
                value={this.state.name}
                onChange={this.onChange}/>
            </div>
            <div className="form-group">
              <label>Trang thai: </label>
              <select
                name="status"
                className="form-control"
                value={this.state.status}
                onChange={this.onChange}>
                <option value={true}>Kich hoat</option>
                <option value={false}>An</option>
              </select><br/>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                <span className="fa fa-plus mr-5"></span>Luu lai
              </button> &nbsp;
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onClear}>
                <span className="fa fa-close mr-5"></span>Huy bo
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddTask: (task) => {
      dispatch(actions.addTask(task));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
