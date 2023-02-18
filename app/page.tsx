"use client" 
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { Text, Spacer } from "@nextui-org/react";


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
  <>
      <Text h2>The future of article sharing</Text>
      <Text size="$lg">
       The Lingoverse allows you to create and share articles.      
      </Text>

  </>
)}