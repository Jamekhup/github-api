import { useRef, useState } from "react";
import Header from "../components/Header"
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../GaphQl/SearchQuery";
import DisplayUserRepos from "../components/DisplayUserRepos";
import RepositoryIssues from "../components/RepositoryIssues";

interface User {
  id: string;
  login: string;
  name: string;
  avatarUrl: string;
}

const Home = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [userResults, setUserResults] = useState<User[]>([]);

  const formRef = useRef<HTMLFormElement>(null);
  
  const { loading, error } = useQuery(GET_USERS, {
    variables: { query: searchTerm },
    skip: !searchTerm,
    fetchPolicy: "no-cache", 
    onCompleted: (data) => {
        setSearchTerm("")
        const newResults = data.search.edges.map(({ node }: { node: User }) => node);
        setUserResults(newResults);
        formRef.current?.reset();
        setSelectedUser(null); 
        setSelectedRepo(null);
    },
  });

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setSearchTerm(formData.get("search") as string);
    };


    //click and get user repo with pagiantion
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };


    //for repo issue
    const [selectedRepo, setSelectedRepo] = useState<{
        id: any; name: string; owner: string,star:string, watcher:string 
} | null>(null);
    const handleRepoClick = (id:string,name: string, owner:string, star:string, watcher:string) => {
        setUserResults([]);
        setSelectedUser(null); 
        setSelectedRepo({ name, owner, star, watcher,id});
    };


  return (
    <>
        <Header title="Home"/>

        <form onSubmit={handleSearch} ref={formRef} className="grid grid-cols-4 items-center gap-2">
            <div className="col-span-3">
                <input 
                    type="text" 
                    name="search"
                    className="border border-gray-300 px-2 py-1.5 w-full rounded-md focus:outline-none focus:border-gray-400"
                    placeholder="Search github users by name..."
                    autoComplete="off"
                />
            </div>
            {
            loading ? (
                <button type="button" className="col-span-1 bg-amber-300 py-[7.5px] rounded-md disabled:opacity-80" disabled>
                <span className="animate-pulse">Searching...</span>
                </button>
            ) : (
                <button type="submit" className="col-span-1 bg-amber-300 py-[7.5px] rounded-md">Search</button>
            )
            }
        </form>

        {
            error && (
                <p className="text-red-400 text-center my-4">Error: {error.message}</p>
            )
        }

        {userResults.length > 0 && (

            
            <div className="grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-4 my-4">
                {userResults.map((node, index:number) => (
                    <div 
                        className="w-full bg-white border border-gray-200 rounded-md drop-shadow-md cursor-pointer" 
                        key={index}
                        onClick={() => handleUserClick(node)}
                    >
                        <img src={node.avatarUrl} alt={node.login} className="w-full" />
                        <p className="py-1.5 text-center">{node.name || node.login}</p>
                    </div>
                ))}
            </div>
        )}


        <div>
            {selectedUser && (
                <DisplayUserRepos 
                    selectedUser={selectedUser}
                    handleRepoClick={handleRepoClick}
                />
            )}
        </div>


        <div className="mt-4">
            {selectedRepo && (
                <RepositoryIssues 
                    owner={selectedRepo.owner} 
                    repoName={selectedRepo.name} 
                    star={selectedRepo.star}
                    watcher={selectedRepo.watcher}
                    repoId={selectedRepo.id}
                />
            )}
        </div>
        
    </>
  )
}

export default Home