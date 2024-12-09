import React, { useEffect, useState } from 'react'
import { createHighlighter } from 'shiki'
import { ShikiMagicMove } from 'shiki-magic-move/react'

import 'shiki-magic-move/style.css'

export default function Issues() {
  const [code, setCode] = useState(`const hello = 'world'`)
  const [highlighter, setHighlighter] = useState()
  useEffect(() => {
    async function initializeHighlighter () {
      const highlighter = await createHighlighter({
        themes: ['nord'],
        langs: ['javascript'],
      })
      setHighlighter(highlighter)
    }
    initializeHighlighter()
  }, [])

  function animate () {
    setCode(`let hi = 'hello'`)
  }

  const shikiMagicMoveDemo = (
    <>
      <ShikiMagicMove
        lang="js"
        theme="nord"
        highlighter={highlighter}
        code={code}
        options={{ duration: 800, stagger: 0.3, lineNumbers: true }}>

      </ShikiMagicMove>
      <button onClick={animate}>Animate</button>
    </>
  )

  return (
    <div>
      {
        highlighter && shikiMagicMoveDemo
      }
    </div>
  )
}
