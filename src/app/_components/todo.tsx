"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function Todos() {
  const [latestTodo] = api.todo.getLatest.useSuspenseQuery();
  const [todos] = api.todo.getAll.useSuspenseQuery();
  console.log("todos", todos);

  const utils = api.useUtils();
  const [title, setTitle] = useState("");
  const createTodo = api.todo.create.useMutation({
    onSuccess: async () => {
      await utils.todo.invalidate();
      setTitle("");
    },
  });
  const updateTodo = api.todo.update.useMutation({
    onSuccess: async () => {
      await utils.todo.invalidate();
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestTodo ? (
        <p className="truncate">Your most recent todo: {latestTodo.title}</p>
      ) : (
        <p>You have no todo yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTodo.mutate({ title });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createTodo.isPending}
        >
          {createTodo.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
      <ul className="my-6 flex flex-col gap-3">
        {todos?.map((todo) => (
          <li key={todo.id} className="truncate">
            <div className="flex flex-row items-center justify-between">
              <p className={todo.done === 1 ? "line-through" : ""}>
                {todo.title}
              </p>
              <button
                onClick={() => {
                  updateTodo.mutate({
                    id: todo.id,
                    done: todo.done === 1 ? 0 : 1,
                  });
                }}
                className={`grid size-6 place-items-center rounded-full text-xs ${
                  todo.done === 1 ? "bg-green-400" : "bg-white"
                }`}
              >
                {todo.done === 1 ? "✔" : ""}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
