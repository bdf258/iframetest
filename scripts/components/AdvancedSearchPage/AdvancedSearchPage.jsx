import React, { useState } from "react";

import Results from "./components/Results";
import SearchField from "./components/SearchField";

const AdvancedSearchPage = () => {
  const [results, setResults] = useState();

  return (
    <div>
      <h1>Advanced Search (Test)</h1>
      <div className="search-info-box">
        <h3>Search Features</h3>
        <ul>
          <li>
            <strong>Basic Search:</strong> Simply type any word or phrase to
            search across all categories
          </li>
          <li>
            <strong>Exact Phrases:</strong> Use quotes for exact matches (e.g.,
            &ldquo;John Smith&rdquo;)
          </li>
          <li>
            <strong>Exclude Words:</strong> Add a minus sign before words you
            want to exclude (e.g., Smith -John)
          </li>
          <li>
            <strong>Multiple Words:</strong> Space-separated words will search
            for records containing any of the words
          </li>
          <li>
            <strong>Smart Matching:</strong> If no results are found, the system
            will automatically try phonetic matching
          </li>
        </ul>
        <h4>Search Categories</h4>
        <ul>
          <li>
            <strong>Constituents:</strong> Searches names, addresses, and
            contact details
          </li>
          <li>
            <strong>Emails:</strong> Searches subject lines, body text, and
            email addresses
          </li>
          <li>
            <strong>Cases:</strong> Searches case summaries and IDs
          </li>
          <li>
            <strong>Memberships:</strong> Searches membership records and
            associated details
          </li>
          <li>
            <strong>Electoral Roll:</strong> Searches voter registration records
          </li>
        </ul>
      </div>

      <div className="feature-comparison">
        <h4>Search Engine Feature Comparison</h4>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  padding: "8px",
                  borderBottom: "2px solid #ddd",
                  textAlign: "left",
                  color: "white",
                }}
              >
                Feature
              </th>
              <th
                style={{
                  padding: "8px",
                  borderBottom: "2px solid #ddd",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Legacy Search
              </th>
              <th
                style={{
                  padding: "8px",
                  borderBottom: "2px solid #ddd",
                  textAlign: "center",
                  color: "white",
                }}
              >
                New Search
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Basic name search", old: true, new: true },
              { name: "Exact phrase matching", old: false, new: true },
              { name: "Email address search", old: true, new: true },
              { name: "Phone number search", old: true, new: false },
              { name: "Case Reference search", old: true, new: true },
              { name: "Membership number search", old: true, new: false },
              { name: "Address search", old: true, new: true },
              { name: "Postcode search", old: true, new: true },
              { name: "First name + Surname combined", old: true, new: true },
              { name: "Organization search", old: true, new: true },
              { name: "Electoral Roll search", old: true, new: true },
              { name: "Phonetic matching", old: false, new: true },
              { name: "Exclude words", old: false, new: true },
              { name: "Search result grouping", old: false, new: true },
              { name: "Relevance scoring", old: false, new: true },
              { name: "Performance metrics", old: false, new: true },
            ].map((feature, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{feature.name}</td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  {feature.old ? "✓" : "✗"}
                </td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  {feature.new ? "✓" : "✗"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <fieldset
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          width: "100%",
        }}
      >
        <legend>Search</legend>
        <SearchField setResults={setResults} />
      </fieldset>

      <fieldset
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          width: "100%",
        }}
      >
        <legend>Results</legend>
        <Results results={results} />
      </fieldset>
    </div>
  );
};

export default AdvancedSearchPage;
