import { useEffect, useState } from "react";

import {
  getCompanies,
  createCompany,
  getJobRoles,
  createJobRole,
  getTags,
  createTag,
} from "../api/taxonomyService";

import TaxonomyList from "../components/TaxonomyList";
import AddTaxonomyModel from "../components/AddTaxonomyModel";

const TaxonomyDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [tags, setTags] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("company");
  const [creating, setCreating] = useState(false);

  const fetchTaxonomy = async () => {
    console.log("start")
    setLoading(true);
    setError("");

    try {
      const [companiesResponse, jobRolesResponse, tagsResponse] =
        await Promise.all([getCompanies(), getJobRoles(), getTags()]);

      console.log(companiesResponse.data)
      console.log(jobRolesResponse.data)
      console.log(tagsResponse.data)

      setCompanies(companiesResponse.data);
      setJobRoles(jobRolesResponse.data);
      setTags(tagsResponse.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load taxonomy data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxonomy();
  }, []);

  const openAddModel = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeAddModel = () => {
    if (!creating) {
      setModalOpen(false);
    }
  };

  const handleCreate = async (name) => {
    setCreating(true);

    try {
      let response;

      if (modalType === "company") {
        response = await createCompany({ name });
        setCompanies((prev) => [...prev, response.data]);
      } else if (modalType === "job_role") {
        response = await createJobRole({ name });
        setJobRoles((prev) => [...prev, response.data]);
      } else {
        response = await createTag({ name });
        setTags((prev) => [...prev, response.data]);
      }

      setModalOpen(false);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Taxonomy</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage companies, job roles, and tags used across the platform.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Companies</p>

            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {companies.length}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Job Roles</p>

            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {jobRoles.length}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Tags</p>

            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {tags.length}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={fetchTaxonomy}
              className="font-medium underline underline-offset-2 hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        <div className="space-y-6">
          <TaxonomyList
            title="Companies"
            items={companies}
            loading={loading}
            onAdd={() => openAddModel("company")}
          />

          <TaxonomyList
            title="Job Roles"
            items={jobRoles}
            loading={loading}
            onAdd={() => openAddModel("job_role")}
          />

          <TaxonomyList
            title="Tags"
            items={tags}
            loading={loading}
            onAdd={() => openAddModel("tag")}
          />
        </div>
      </div>

      <AddTaxonomyModel
        isOpen={modalOpen}
        onClose={closeAddModel}
        onSubmit={handleCreate}
        type={modalType}
        loading={creating}
      />
    </div>
  );
};

export default TaxonomyDashboard;
