import React from 'react'

interface BlockType {
  type: 'paragraph' | 'bulleted_list_item' | 'callout'
  blockId: string
  parent: string
  children: BlockType[]
}

interface BlockProps {
  type: BlockType['type']
  parent: BlockType['parent']
}

const Block: React.FC<BlockProps> = ({ type, parent }) => {
  switch (type) {
    case 'paragraph':
      return <p>{parent}</p>
    case 'bulleted_list_item':
      return (
        <ul>
          <li>{parent}</li>
        </ul>
      )
    case 'callout':
      return <div className='callout'>{parent}</div>
    default:
      return null
  }
}

interface PostProps {
  data: BlockType[]
}

export default function PostBody({ data }: any) {
  return (
    <div>
      <div>
        {data?.map((block: any) => (
          <Block key={block.blockId} type={block.type} parent={block.parent} />
        ))}
      </div>
    </div>
  )
}
