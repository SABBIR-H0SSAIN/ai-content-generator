import Pagination from '@/components/Pagination';
import TemplateExploreCard from '@/components/TemplateExploreCard';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TEMPLATE_PAGINATION_LIMIT } from '@/constants';
import { getPublicTemplates } from '@/lib/db';
import React from 'react'



export function SelectDemo() {
  return (
    <Select >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent className='flex  justify-self-end'>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
const ExplorePageContent = async ({params}:{
    params:Promise<{
        query?:string,
        page?:string,
    }>
}) => {
    const {query='',page} = await params

  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * TEMPLATE_PAGINATION_LIMIT;

  const templates = await getPublicTemplates({
    query,
    limit: TEMPLATE_PAGINATION_LIMIT,
    offset,
  });
  return (
    <div>
      

      <div className="w-full max-w-7xl mx-auto flex justify-center">
        <div
          className="grid grid-cols-2  sm:grid-cols-3 xl:grid-cols-4  px-5 max-xs:px-3 lg:px-10 py-5 max-xs:gap-3 gap-5"
          // style={{ gap: "1.25rem" }}
        >
          {templates.map((template, index) => (
            <TemplateExploreCard key={index} data={template} />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          count={templates.length}
          limit={TEMPLATE_PAGINATION_LIMIT}
          className="mt-4 mb-10"
        />
      </div>
    </div>
  );
}

export default ExplorePageContent