"use client";

import { useEffect, useState } from "react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Verification {
  id: string;
  user: { email: string };
  documents: { files: string[]; businessUrl?: string };
  status: string;
}

export default function AdminDashboard() {
  const [verifications, setVerifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchVerifications = async () => {
      const data = await fetch("/api/verification", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setVerifications(data);
    };

    fetchVerifications();
  }, []);

  const handleReview = async (id: string, status: "APPROVED" | "REJECTED") => {
    try {
      const response = await fetch(`/api/verification/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update verification");
      }

      setVerifications(verifications.filter((v) => v.id !== id));
    } catch (error: any) {
      console.error("Error updating verification:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-4">
        {verifications.length === 0 && (
          <p className="text-gray-500">No pending verifications.</p>
        )}
        {verifications.map((verification) => (
          <Card key={verification.id}>
            <CardHeader>
              <CardTitle>Submitted by: {verification.user.email}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p>
                    <strong>Business URL:</strong>{" "}
                    {verification.documents.businessUrl || "None"}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Documents:</h3>
                  {verification.documents.files.length === 0 ? (
                    <p>No documents uploaded.</p>
                  ) : (
                    <div className="space-y-4">
                      {verification.documents.files.map(
                        (file: string, index: number) => (
                          <div key={index} className="space-y-2">
                            <p>
                              <strong>File {index + 1}:</strong>{" "}
                              {file.split("/").pop()}
                            </p>
                            {file.toLowerCase().endsWith(".pdf") ? (
                              <div className="border rounded">
                                <iframe
                                  src={file}
                                  title={`Document ${index + 1}`}
                                  className="w-full h-96"
                                />
                              </div>
                            ) : (
                              <p>Preview not available for non-PDF files.</p>
                            )}
                            <Button asChild>
                              <a
                                href={file}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Download File
                              </a>
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
                <div className="space-x-2">
                  <Button
                    onClick={() => handleReview(verification.id, "APPROVED")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleReview(verification.id, "REJECTED")}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
