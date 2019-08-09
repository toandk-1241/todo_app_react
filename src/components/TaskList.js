import React, {Component} from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1 // all: -1, active: 1, deactive: 0
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.props.onFilter(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus
    );

    this.setState({
      [name]: value
    });
  }

  render() {
    var {tasks} = this.props;
    var {filterName, filterStatus} = this.state;
    var elmTasks = tasks.map((task,idex) => {
      return <TaskItem
        key={task.id}
        index={idex}
        task={task}
        onUpdateStatus={this.props.onUpdateStatus}
        onDelete={this.props.onDelete}
        onUpdate={this.props.onUpdate} />
    })

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Ten</th>
            <th className="text-center">Trang thai</th>
            <th className="text-center">Hanh dong</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                name="filterName"
                className="form-control"
                value={filterName}
                onChange={this.onChange} />
            </td>
            <td>
              <select
                name="filterStatus"
                className="form-control"
                value={filterStatus}
                onChange={this.onChange} >
                <option value={-1}>Tat ca</option>
                <option value={0}>An</option>
                <option value={1}>Kich hoat</option>
              </select>
            </td>
            <td></td>
            <td></td>
          </tr>
          {elmTasks}
        </tbody>
      </table>
    )
  }
}

export default TaskList;
