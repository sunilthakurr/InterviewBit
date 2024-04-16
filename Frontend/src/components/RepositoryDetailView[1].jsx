import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RepositoryDetailView = ({ repo }) => {
  const [readmeContent, setReadmeContent] = useState('');
  const [commits, setCommits] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await axios.get(`${repo.url}/readme`);
        setReadmeContent(response.data.content);
      } catch (error) {
        console.error('Error fetching README:', error);
      }
    };

    const fetchCommits = async () => {
      try {
        const response = await axios.get(`${repo.url}/commits`);
        setCommits(response.data);
      } catch (error) {
        console.error('Error fetching commits:', error);
      }
    };

    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${repo.url}/issues`);
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    if (repo) {
      fetchReadme();
      fetchCommits();
      fetchIssues();
    }
  }, [repo]);

  return (
    <div className="repository-detail bg-gray-100 p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">Repository Detail</h2>
      <div className="section">
        <h3 className="text-lg font-semibold mb-2">Readme</h3>
        <div className="readme whitespace-pre-wrap bg-white p-4 rounded">{readmeContent}</div>
      </div>
      <div className="section">
        <h3 className="text-lg font-semibold mb-2">Recent Commits</h3>
        <ul className="list-disc list-inside">
          {commits.map(commit => (
            <li key={commit.sha} className="commit bg-white p-2 rounded shadow mb-2">
              <div className="font-semibold">{commit.commit.author.name}</div>
              <div className="text-gray-600">{commit.commit.message}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h3 className="text-lg font-semibold mb-2">Open Issues</h3>
        <ul className="list-disc list-inside">
          {issues.map(issue => (
            <li key={issue.id} className="issue bg-white p-2 rounded shadow mb-2">
              <div className="font-semibold">{issue.title}</div>
              <div className="text-gray-600">Issue #{issue.number}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RepositoryDetailView;
