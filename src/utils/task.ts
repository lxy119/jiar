import {useHttp} from "./http";
import {QueryKey, useMutation, useQuery} from "react-query";
import {cleanObject} from "./index";
import {Task} from "../types/task";
import { useDebounce } from "utils";
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig } from "./use-optimistic-options";
import { Project } from "types/project";
import { SortProps } from "./spectaculars";

export  const useTasks=(param?:Partial<Task>)=>{
    const client = useHttp();
    const debouncedParam = { ...param, name: useDebounce(param?.name, 200) };

    return useQuery<Task[]>(['tasks',cleanObject(param)],()=>client('tasks',{data:debouncedParam}))
}
export const useAddTask = (queryKey: QueryKey) => {
    const client = useHttp();
  
    return useMutation(
      (params: Partial<Task>) =>
        client(`tasks`, {
          data: params,
          method: "POST",
        }),
      useAddConfig(queryKey)
    );
  };
  
  export const useTask = (id?: number) => {
    const client = useHttp();
    return useQuery<Project>(["task", { id }], () => client(`tasks/${id}`), {
      enabled: Boolean(id),
    });
  };
  
  export const useEditTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
      (params: Partial<Task>) =>
        client(`tasks/${params.id}`, {
          method: "PATCH",
          data: params,
        }),
      useEditConfig(queryKey)
    );
  };
  
  export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp();
  
    return useMutation(
      ({ id }: { id: number }) =>
        client(`tasks/${id}`, {
          method: "DELETE",
        }),
      useDeleteConfig(queryKey)
    );
  };
  
  export const useReorderTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation((params: SortProps) => {
      return client("tasks/reorder", {
        data: params,
        method: "POST",
      });
    }, useReorderTaskConfig(queryKey));
  };