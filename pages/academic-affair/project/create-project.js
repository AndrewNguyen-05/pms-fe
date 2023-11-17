import Meta from "@/components/Meta";
import Link from "next/link";

const createProject = () => {
  return (
    <>
      <Meta title={"Create new project"} />
      <div className="bg-slate-50 h-full pt-6">
        <section class="bg-white mx-20 rounded-lg">
          <div class="py-4 px-6">
            <h2 class="mb-4 text-xl font-bold text-gray-900 ">
              Create new project
            </h2>
            <form action="#">
              <div class="grid grid-cols-2 gap-4 ">
                <div class="col-span-2">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Topic
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter topic of project"
                    required=""
                  />
                </div>
                <div class="w-full">
                  <label
                    for="brand"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Faculty
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter faculty"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="project-type"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Type
                  </label>
                  <select
                    id="project-type"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                    required=""
                  >
                    <option selected="true" disabled="disabled">
                      Select project type
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <fieldset className="col-span-2 border border-solid border-gray-300 p-3 rounded-lg">
                  <legend className="font-semibold">
                    Teacher's Information
                  </legend>
                  <div className="grid grid-cols-3 gap-4">
                    <div class="w-full col-span-1">
                      <label
                        for="teacher-id"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        ID
                      </label>
                      <input
                        type="number"
                        name="teacher-id"
                        id="teacher-id"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="Enter id"
                        required=""
                      />
                    </div>
                    <div class="w-full col-span-2">
                      <label
                        for="teacher-name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="teacher-name"
                        id="teacher-name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="Enter name"
                        required=""
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <label
                      for="teacher-contact-info"
                      class="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Contact Information
                    </label>
                    <input
                      type="text"
                      name="teacher-contact-info"
                      id="teacher-info"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Enter faculty"
                      required=""
                    />
                  </div>
                </fieldset>

                <div class="w-full col-span-2">
                  <label
                    for="requirement"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Requirement
                  </label>
                  <input
                    type="text"
                    name="requirement"
                    id="requirement"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter project's requirement"
                    required=""
                  />
                </div>
                <div class="col-span-2">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="8"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                    placeholder="Description of the project"
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-8 justify-end">
                <Link href="/academic-affair/project/view-project">
                  <button
                    type="submit"
                    className="items-center px-5 py-2.5 mt-4 text-sm font-medium border-2 border-red-600 text-center text-red-600 bg-white  rounded-lg focus:ring-2 focus:ring-red-200 hover:bg-red-600 hover:text-white hover:border-red-600"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="items-center px-5 py-2.5 mt-4 text-sm font-medium border-2 border-blue-700 text-center text-blue-700 bg-white  rounded-lg focus:ring-2 focus:ring-blue-200 hover:bg-blue-700 hover:text-white"
                >
                  Add project
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default createProject;
