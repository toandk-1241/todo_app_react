import React, {Component} from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
  render() {
    var {tasks} = this.props;
    var elmTasks = tasks.map((task,idex) => {
      return <TaskItem
        key={task.id}
        index={idex}
        task={task}
        onUpdateStatus={this.props.onUpdateStatus}/>
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
            <td>
              <input type="text" name="filterName" className="form-control"/>
            </td>
            <td>
              <select name="filterStatus" className="form-control">
                <option value={-1}>Tat ca</option>
                <option value={-1}>An</option>
                <option value={-1}>Kich hoat</option>
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
