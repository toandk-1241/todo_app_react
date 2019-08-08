import React, {Component} from 'react';

class TaskForm extends Component {
  onCloseForm = () => {
    this.props.onCloseForm();
  }

  render() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            Them cong viec
            <span
              className="fa fa-times-circle pull-right"
              onClick={this.onCloseForm}></span>
          </h3>
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label>Ten: </label>
              <input type="text" className="form-control" id="" name="name"/>
            </div>
            <div className="form-group">
              <label>Trang thai: </label>
              <select name="status" className="form-control">
                <option value={true}>Kich hoat</option>
                <option value={false}>An</option>
              </select><br/>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                <span className="fa fa-plus mr-5"></span>Luu lai
              </button> &nbsp;
              <button type="submit" className="btn btn-primary">
                <span className="fa fa-close mr-5"></span>Huy bo
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default TaskForm;
