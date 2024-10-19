import { useState } from "react";
import Modal from "./Modal";
import { useMutation } from "@apollo/client";
import { CREATE_ISSUE } from "../GaphQl/NewIssueQuery";
import { GET_REPO_ISSUES } from "../GaphQl/IssueQuery";

interface NewIssueProps {
    isModalOpen: boolean;
    onclose: () => void;
    title?: string;
    width?: string;
    repoId:string,
    owner: string,
    name: string,
}

const OpenIssue:React.FC<NewIssueProps> = ({
    isModalOpen,
    onclose,
    title,
    width,
    repoId,
    owner,
    name,
}) => {

  const [issueTitle, setIssueTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createIssue({ variables: { repoId, title:issueTitle, body } });
  };

  const [createIssue, {loading}] = useMutation(CREATE_ISSUE, {
    refetchQueries: [
      {
        query: GET_REPO_ISSUES,
        variables: { owner, name, first: 50 }, // Adjust as needed for your pagination
      },
    ],
    onCompleted: () => {
      onclose(),
      setIssueTitle("");
      setBody(""); 
    },
    onError: (error) => {
      console.error("Error creating issue:", error.message);
    },
  });
  
  return (
    <Modal isOpen={isModalOpen} onClose={onclose} title={title} width={width}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-start gap-3">
            <div>
              <input
                id="title"
                type="text"
                value={issueTitle}
                onChange={(e) => setIssueTitle(e.target.value)}
                className="border border-gray-300 px-2 py-1.5 w-full rounded-md focus:outline-none focus:border-gray-400"
                placeholder="Issue Title"
                required
              />
            </div>
            <div>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="border border-gray-300 px-2 py-1.5 w-full rounded-md focus:outline-none focus:border-gray-400"
                placeholder="Issue Description"
                rows={4}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end items-center gap-2 text-sm mt-2">
            <button type="button" className="bg-red-300 py-2 px-3 rounded-md" onClick={onclose}>Cancel</button>
            {
            loading ? (
              <button type="button" className="bg-amber-200 py-2 px-3 rounded-md" disabled>Creating ...</button>
            ) : (
              <button type="submit" className="bg-amber-300 py-2 px-3 rounded-md">Create</button>
            )
            }
            
          </div>
        </form>
    </Modal>
  )
}

export default OpenIssue