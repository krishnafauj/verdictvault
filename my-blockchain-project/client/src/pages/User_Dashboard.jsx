import React, { useState } from 'react';

// Sample data (replace with actual data from backend)
const user = {
    police: {
        victim: {
            name: 'John Doe',
            fatherName: 'Robert Doe',
            motherName: 'Alice Doe',
            aadharCardNo: '1234-5678-9012',
            mobileNo: '9876543210',
            address: '123 Street, City',
            district: 'District A',
            state: 'State X',
            pincode: '123456',
            photo: 'path-to-photo.jpg', // Sample photo path
        },
        culprit: {
            name: 'Jane Smith',
            fatherName: 'Richard Smith',
            motherName: 'Eve Smith',
            aadharCardNo: '2345-6789-0123',
            mobileNo: '8765432109',
            address: '456 Avenue, City',
            district: 'District B',
            state: 'State Y',
            pincode: '654321',
            photo: 'path-to-photo.jpg', // Sample photo path
        },
        policeStationInfo: {
            stationNumber: '001',
            caseFilingPerson: 'Officer Brown',
            caseNumber: 'C123456',
        },
        caseDetails: [
            {
                caseName: 'Case A',
                caseDescription: 'Description of Case A',
                caseDate: '2023-01-01',
                status: 'Open',
            },
        ],
    },
    lawyer: {
        name: 'Lawyer A',
        lawyerId: 'L123',
        documents: ['document1.pdf', 'document2.pdf'],
    },
    judge: {
        name: 'Judge A',
        judgeId: 'J123',
        verdicts: [
            {
                caseId: 'C123456',
                caseStatus: 'pending',
                verdict: 'Verdict here',
                date: '2023-02-01',
            },
        ],
    },
};

function User_Board() {
    const [verdicts, setVerdicts] = useState(user.judge.verdicts || []);

    return (
        <div className="min-h-screen p-8 bg-gray-900 text-white">
            {/* Header */}
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white">Jurisdiction Dashboard</h1>
                <p className="text-gray-600">Manage case details, involved persons, and legal documents</p>
            </header>

            {/* Main Grid: Victim, Culprit, Case Info Sections */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Victim Info */}
                <div className="p-6 bg-white text-gray-900 rounded-lg shadow-md">
                    <h2 className="mb-4 text-xl font-bold">Victim Information</h2>
                    <img src={user.police.victim.photo} alt="Victim" className="mb-4 w-full h-48 rounded-md object-cover" />
                    <p><strong>Name:</strong> {user.police.victim.name}</p>
                    <p><strong>Father's Name:</strong> {user.police.victim.fatherName}</p>
                    <p><strong>Address:</strong> {user.police.victim.address}</p>
                    <p><strong>State:</strong> {user.police.victim.state}</p>
                </div>

                {/* Culprit Info */}
                <div className="p-6 bg-white text-gray-900 rounded-lg shadow-md">
                    <h2 className="mb-4 text-xl font-bold">Culprit Information</h2>
                    <img src={user.police.culprit.photo} alt="Culprit" className="mb-4 w-full h-48 rounded-md object-cover" />
                    <p><strong>Name:</strong> {user.police.culprit.name}</p>
                    <p><strong>Father's Name:</strong> {user.police.culprit.fatherName}</p>
                    <p><strong>Address:</strong> {user.police.culprit.address}</p>
                    <p><strong>State:</strong> {user.police.culprit.state}</p>
                </div>

                {/* Case Info */}
                <div className="p-6 bg-white text-gray-900 rounded-lg shadow-md">
                    <h2 className="mb-4 text-xl font-bold">Case Information</h2>
                    <p><strong>Case Number:</strong> {user.police.policeStationInfo.caseNumber}</p>
                    <p><strong>Station Number:</strong> {user.police.policeStationInfo.stationNumber}</p>
                    <p><strong>Filed By:</strong> {user.police.policeStationInfo.caseFilingPerson}</p>
                </div>
            </div>

            {/* Documents Section */}
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-bold text-gray-700">Documents</h2>
                <ul className="space-y-2">
                    {user.lawyer.documents.map((doc, index) => (
                        <li key={index} className="p-2 text-blue-500 underline cursor-pointer hover:text-blue-700">
                            {doc}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Full-Width Verdicts Display Section */}
            <div className="mt-8 p-6 bg-gray-900 text-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-bold">All Verdicts</h2>
                {verdicts.map((verdict, index) => (
                    <div key={index} className="mb-4 p-4 bg-gray-100 text-gray-900 rounded-lg shadow">
                        <p><strong>Case ID:</strong> {verdict.caseId}</p>
                        <p><strong>Status:</strong> {verdict.caseStatus}</p>
                        <p><strong>Verdict:</strong> {verdict.verdict}</p>
                        <p><strong>Date:</strong> {new Date(verdict.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default User_Board;
           