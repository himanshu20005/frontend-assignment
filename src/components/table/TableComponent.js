import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TableComponent.css";
import Navbar from "../navbar/Navbar";

const TableComponent = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // API call to handle responses
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(
                    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
                );
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchProjects();
    }, []);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(projects.length / recordsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleRowClick = (project) => {
        setSelectedProject(project);
    };

    const closePopup = () => {
        setSelectedProject(null);
    };


    return (
        <>
            <div className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
                <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                <div className="table-header-container" >
                    <div className="table-heading" >Highly-rated Kickstarter Projects Table</div>

                    <div className="controls">
                        <label htmlFor="pagination-count">Records per page</label>
                        <select
                            id="pagination-count"
                            value={recordsPerPage}
                            className='pagination-count'
                            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                </div>

                {/* Table Logic */}
                <div className="table-wrapper">
                    <table className={`styled-table ${isDarkMode ? "dark-mode" : "light-mode"}`}>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Percentage Funded</th>
                                <th>Amount Pledged (USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects
                                .slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
                                .map((project) => (
                                    <tr
                                        key={project["s.no"]}
                                        onClick={() => handleRowClick(project)}
                                    >
                                        <td>{project["s.no"]}</td>
                                        <td>{project["percentage.funded"]}%</td>
                                        <td>${project["amt.pledged"].toLocaleString()}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                {/* Additional || Opens a popup with other data from API response */}
                {selectedProject && (
                    <div className={`popup ${isDarkMode ? "dark-popup" : "light-popup"}`}>
                        <div className="popup-content">
                            <div className="popup-header">
                                <h3>{selectedProject.title}</h3>
                                <button className={`close-btn ${isDarkMode ? "dark-popup" : "light-popup"}`} onClick={closePopup}>
                                    &times;
                                </button>
                            </div>
                            <p className={`popup-subcontent ${isDarkMode ? "dark-popup" : "light-popup"}`}>
                                <strong>Blurb:</strong> {selectedProject.blurb}
                            </p>
                            <p className={`popup-subcontent ${isDarkMode ? "dark-popup" : "light-popup"}`}>
                                <strong>By:</strong> {selectedProject.by}
                            </p>
                            <p className={`popup-subcontent ${isDarkMode ? "dark-popup" : "light-popup"}`}>
                                <strong>Country:</strong> {selectedProject.country}
                            </p>

                        </div>
                    </div>
                )}

            </div>

            {/* Pagination Handling logic */}
            <div className={`pagination ${isDarkMode ? "dark-mode" : "light-mode"}`}>
                <button onClick={handlePrevPage} disabled={currentPage === 1} className={`footer-btn ${isDarkMode ? "dark-mode" : "light-mode"}`}>
                    Previous
                </button>
                <span>
                    Page {currentPage} of {Math.ceil(projects.length / recordsPerPage)}
                </span>
                <button
                    onClick={handleNextPage}
                    className={`footer-btn ${isDarkMode ? "dark-mode" : "light-mode"}`}
                    disabled={currentPage === Math.ceil(projects.length / recordsPerPage)}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default TableComponent;
