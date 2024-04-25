import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { fetchUpcomingTasks } from "../api/fetchUpcomingTasks";
import { useGetUserId } from "../hooks/getUserId";
import { useGetUserOrgId } from "../hooks/getUserOrgId";
import { motion } from 'framer-motion';
import { fadeOut, pageTransition, fade, fadeIn } from "../utils/framer";
import { deleteTask } from "../api/deleteTask";
import Loading from "../components/Loading";
import calendar from "../assets/calendar.png"

export function UpcomingTasks() {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const userId = useGetUserId();
    const organizationId = useGetUserOrgId();

    useEffect(() => {
        fetchData();
    }, [userId, organizationId]);

    const fetchData = async () => {
        if (userId) {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetchUpcomingTasks(userId, organizationId);
                setTodos(response);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (error) return <p>Error: {error.message}</p>;

    if (isLoading) return <Loading />;

    const handleTodoDelete = async (todoId) => {
        setIsLoading(true);
        setError(null);

        try {
            await deleteTask(todoId);
            fetchData();
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (error) return <p>Error: {error.message}</p>;


    return (
        <motion.div
            initial={fade}
            animate={fadeIn}
            exit={fadeOut}
            transition={pageTransition}
            className="w-full h-screen"
        >
            {todos.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <img src={calendar} alt="EmptyCart" className="w-[12rem] " />
                    <h1 className="w-full text-center font-sans  mt-2">
                        Nothing here at the moment...
                    </h1>
                </div>
            )}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full h-full p-10 overflow-y-auto'>
                {todos.map(todo =>
                    <TaskCard key={todo.id} todo={todo} handleTodoDelete={() => handleTodoDelete(todo.id)} />
                )
                }
            </div>
        </motion.div>
    );
}