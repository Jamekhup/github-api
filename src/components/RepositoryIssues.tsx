import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPO_ISSUES } from '../GaphQl/IssueQuery'; 
import { DateUtil } from '../utils/DateUtil';
import Pagination from './Pagination';
import OpenIssue from './OpenIssue';

interface RepositoryIssuesProps {
  repoId: string;
  owner: string;
  repoName: string;
  star:string,
  watcher:string,
}

const RepositoryIssues: React.FC<RepositoryIssuesProps> = ({repoId, owner, repoName, star, watcher }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [issuesPerPage] = useState(50); 
    const [endCursor, setEndCursor] = useState<string | null>(null);
    const [totalIssues, setTotalIssues] = useState<number>(0);

    const { loading, error, data, fetchMore } = useQuery(GET_REPO_ISSUES, {
        variables: { owner, name: repoName, first: issuesPerPage, after:null},
        skip: !repoName, 
        onCompleted: (data) => {
            setTotalIssues(data.repository.issues.totalCount);
            setEndCursor(data.repository.issues.pageInfo.endCursor);
        },
    });

    const handlePageChange = (pageNumber: number) => {

        setCurrentPage(pageNumber);
        fetchMore({
          variables: {
            onwer:owner,
            name:repoName,
            first: issuesPerPage,
            after: endCursor,
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prevResult;
    
            setEndCursor(fetchMoreResult.repository.issues.pageInfo.endCursor);
    
            return {
              ...fetchMoreResult,
            };
          },
        });
      };

    const totalPages = Math.ceil(totalIssues / issuesPerPage);

    //for opening new issue
    const [modalPopup, setModalPopup] = useState<boolean>(false);


    if (loading) {
        return (
            <p className='text-center'>Loading Issues ...</p>
        )
    }
    if (error) {
        return (
            <p className='text-center text-red-400'>Error fetching issues: {error?.message}</p>
        )
    }

    return (
        <div>
            <div className='flex justify-between items-center mb-3'>
                <h2 className='text-md font-semibold'>Issues for {repoName}</h2>
                <p className='font-mono text-sm'>{star || 0} {Number(star) <= 0 ? "Star" : "Stars"} / {watcher || 0} Watching</p>
            </div>

            <div className='my-3 flex justify-between items-center border-b border-gray-200 pb-1'>
                <p className='font-semibold'>Open Issue</p>
                <button 
                    type='button' 
                    className='bg-blue-400 py-1 px-3 rounded-md'
                    onClick={() => setModalPopup(true)}
                >
                    New Issue
                </button>
            </div>
            <div className='flex flex-col gap-2'>
                {data.repository.issues.edges.map(({ node }: any, index:number) => (
                <div className='flex justify-between items-center border-b border-gray-200' key={index}>
                        <p>{node.title}</p>
                        <div className='flex justify-start gap-1 items-center text-sm text-gray-600'>
                            <p><DateUtil dateString={node.createdAt}/></p>
                            <p>by {node.author.login}</p>
                        </div>
                </div>
                ))}
            </div>
            <Pagination 
                totalPages={totalPages} 
                currentPage={currentPage} 
                onPageChange={handlePageChange} 
            />


            {/* open new issue */}
            <OpenIssue
                isModalOpen={modalPopup}
                onclose={() => setModalPopup(false)}
                width="w-11/12 sm:w-5/6 md:w-1/3"
                title="New Issue"
                repoId={repoId}
                owner={owner}
                name={repoName}
            />


        </div>
    );
};

export default RepositoryIssues;
