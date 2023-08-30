
import styled from 'styled-components';

interface Task {
    id: number;
    title: string;
    date: string;
    category: string;
  }

const Button = styled.button`
  background: red;
  color: white;
`;
interface Props {
    tasks: Task[];
    onDelete: (id: number) => void;
  }
  
  const TaskList = ({ tasks, onDelete }: Props) => {
    if (tasks.length === 0) return <p>No tasks yet.</p>;
return(
    <>
<div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-center text-sm font-light">
          <thead
            className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
            <tr>
           
              <th scope="col" className=" px-6 py-4">Title</th>
              <th scope="col" className=" px-6 py-4">Due Date</th>
              <th scope="col" className=" px-6 py-4">Category</th>
              <th scope="col" className=" px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
    
          {tasks.map((task) => (

       
                <tr className="border-b dark:border-neutral-500" key={task.id}>
                          
                <td className="whitespace-nowrap  px-6 py-4 font-medium">{task.title}</td>
                <td className="whitespace-nowrap  px-6 py-4">{task.date}</td>
                <td className="whitespace-nowrap  px-6 py-4">{task.category}</td>

                <td><Button    onClick={() => onDelete(task.id)}>Delete</Button></td>
                </tr>
           ) ) }
        
 
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </>
);




};

export default TaskList;