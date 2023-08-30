
import categories from "./categories";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { yupResolver } from '@hookform/resolvers/yup';




 const formSchema = z
 .object({
   title: z.string().min(3, "Title is required").max(100),
  //  date: z.coerce.date().refine((data) => data > new Date(), {message: 'date is required'}),

   date: z.string().refine(
    (dateString) => {
      const date = new Date(dateString);
      
      return (
        !isNaN(date.getTime()) && dateString === date.toISOString().slice(0, 10)
      );
    },
    {
      message: "Invalid date. The format should be YYYY-MM-DD.",
    }
  ),
   category: z.enum(categories, {
     errorMap: () => ({ message: "Category is required." }),
   })
   
 })
 
 type FormSchemaType = z.infer<typeof formSchema>;

 
 interface Props{
  onSubmit: (data:FormSchemaType) => void;
 }
const TaskForm = ({onSubmit}: Props) => {
  

   
    //  const [startDate, setStartDate] = useState(new Date());
     
    //  const [title, setTitle] = useState( () =>{
    //     const saved = localStorage.getItem("title");
    //     const initialValue = JSON.parse(saved);
    //     return initialValue || "";
    //   }

    //   );
    
    //  useEffect(() => {
      
    //     localStorage.setItem("title", JSON.stringify(title));
    //   }, [title]);

      const {register,handleSubmit, formState: { errors },
      } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });
     
    

    return(
<>
<section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Task Management App
            </h1>
        
            {/* onSubmit={handleSubmit(onSubmit)} */}
            <form className="space-y-4 md:space-y-6" 
           
              onSubmit={handleSubmit((data) => {
                onSubmit(data);
                
            })}
            >
              <div>
                <label
                  htmlFor="Title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                 Title
                </label>
                <input
                  // value={title}
                  // onChange={(e) => setTitle(e.target.value)}
                 
                {...register("title", { required: true })} 
                  // type="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Title"
                />
                  {errors.title && <p className="text-danger">{errors.title?.message}</p>}
              
              </div>
              <div>
                <label
                //   htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <div>
                <input
                  // value={date}
                  // onChange={(e) => setTitle(e.target.value)}
                  {...register("date", { required: true })} 
              
                 type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder=""
                />
                  {errors.date && <p className="text-danger">{errors.date?.message}</p>}
                </div>
              </div>
              <div>
                {/* <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label> */}
    <label htmlFor="category"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
    <select {...register("category")} id="category" className="form-select">
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}

              </div>
              <button
                type="submit"
                className="w-full  bg-primary-600  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  submit"   >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
</>
    );
}
export default TaskForm;