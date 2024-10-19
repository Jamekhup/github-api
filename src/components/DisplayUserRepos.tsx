import React, { useState} from 'react'
import { GET_USER_REPOSITORIES } from '../GaphQl/RepoQuery';
import { useQuery } from '@apollo/client';
import Pagination from './Pagination';

interface User {
  avatar?: string | null;
  id?: string | null;
  login?: string | null;
  name?: string | null;
}

interface SelectedUserProps {
  selectedUser: User | null; 
  handleRepoClick: (id:string, name: string, owner:string, star:string, watcher:string) => void; 
}


const DisplayUserRepos:React.FC<SelectedUserProps> = ({selectedUser, handleRepoClick}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [repositoriesPerPage] = useState(50); 
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [totalRepositories, setTotalRepositories] = useState<number>(0);


  const {data,loading, error, fetchMore } = useQuery(GET_USER_REPOSITORIES, {
    variables: { username: selectedUser?.login,first:repositoriesPerPage, after: null },
    onCompleted: (data) => {
      setTotalRepositories(data.user.repositories.totalCount);
      setEndCursor(data.user.repositories.pageInfo.endCursor);
    },
  });


  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);


    fetchMore({
      variables: {
        username: selectedUser?.login,
        first: repositoriesPerPage,
        after: endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        setEndCursor(fetchMoreResult.user.repositories.pageInfo.endCursor);

        return {
          ...fetchMoreResult,
        };
      },
    });
  };
  const totalPages = Math.ceil(totalRepositories / repositoriesPerPage);
 
  return (

    <div className='my-4'>

      <div>
        <h2 className='text-md font-semibold mb-1.5'>{selectedUser?.name || selectedUser?.login}'s  Repositories</h2>
        {loading ? (
          <p className='text-center my-2'>Loading repositories...</p>
        ) : error ? (
          <p className='text-center text-red-400'>Error fetching repositories: {error.message}</p>
        ) : (
          <>
            <div className='flex flex-col gap-2'>
              {data?.user.repositories?.edges.map(({ node }:any, index:number) => (
                  <div
                    key={index} 
                    className='border border-gray-200 p-2 drop-shadow-sm rounded-md flex justify-between items-center hover:bg-gray-200 cursor-pointer'
                    onClick={() => handleRepoClick(node.id, node.name, selectedUser?.login as string, node.stargazerCount, node.watchers?.totalCount)}
                  >
                    <div>
                        <p>{node.name}</p>
                    </div>
                    <div>
                        <p className='font-mono text-sm'>{node.stargazerCount} {Number(node.stargazerCount) <= 0 ? "Star" : "Stars"} / {node.watchers?.totalCount} Watching</p>
                    </div>
                  </div>
              ))}
            </div>

            <Pagination 
              totalPages={totalPages} 
              currentPage={currentPage} 
              onPageChange={handlePageChange} 
            />
          </>
        )}
        
      </div>

     

    </div>
  )
}

export default DisplayUserRepos