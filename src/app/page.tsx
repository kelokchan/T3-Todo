import { api, HydrateClient } from "~/trpc/server";
import { Todos } from "./_components/todo";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.todo.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-700 text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
            To-Do List
          </h1>

          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
          </div>

          <Todos />
        </div>
      </main>
    </HydrateClient>
  );
}
