'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { getFormatDate, isNewPost } from '@/utils/dateFormat'
import { useSetRecoilState } from 'recoil'
import { currentPostItem } from '@/atoms/currentPostItem'

export default function PostList({ data }: any) {
  const router = useRouter()
  const setCurrentPost = useSetRecoilState(currentPostItem)
  const now: Date = new Date()

  const handleClickPost = (post: any) => {
    const { 이름, preview, category } = post?.properties
    console.log(post)
    router.push(`/post/${post.id}`)

    setCurrentPost({
      id: post.id || '',
      category: category?.multi_select[0]?.name || '',
      category_color: category?.multi_select[0]?.color || '',
      created_time: getFormatDate(post.created_time) || '',
      title: 이름.title[0]?.plain_text || '',
      preview: preview?.rich_text[0]?.plain_text || '',
    })
  }

  return (
    <section className='text-gray-600 body-font overflow-hidden'>
      <div className='container px-5 py-12 mx-auto'>
        <div className='-my-8 divide-y-2 divide-gray-100'>
          {data.map((post: any) => {
            const { 이름, preview, category } = post?.properties
            return (
              <div
                className='py-8 flex flex-wrap md:flex-nowrap cursor-pointer transition-all ease-in-out duration-500 transform hover:-translate-y-2'
                key={post.id}
                onClick={() => handleClickPost(post)}
              >
                <div className='md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col'>
                  <span className='font-semibold title-font text-[#4150A6]'>
                    {category?.multi_select[0]?.name || ''}
                  </span>
                  <span className='mt-1 text-gray-400 text-sm mt-2 items-center'>
                    {getFormatDate(post.created_time) || ''}
                    {isNewPost(post.created_time) && (
                      <span className='mx-2 bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300'>
                        New
                      </span>
                    )}
                  </span>
                </div>
                <div className='md:flex-grow'>
                  <h2 className='text-2xl font-medium text-black title-font mb-2'>
                    {이름.title[0]?.plain_text || '-'}
                  </h2>
                  <p className='leading-relaxed line-clamp-3 text-black'>
                    {preview?.rich_text[0]?.plain_text || '-'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
