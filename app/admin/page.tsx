"use client";

import { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
type DateValue = Date | null | [Date | null, Date | null];

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [featured, setFeatured] = useState(false);
  const [body, setBody] = useState("");

  const addTag = () => {
    if (!tagInput.trim()) return;
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const downloadMarkdown = () => {
    if (!date) return;

    const md = `---
title: "${title}"
subheadline: "${subheadline}"
author: "${author}"
date: "${date.toISOString()}"
category: "${category}"
tags: [${tags.map((t) => `"${t}"`).join(", ")}]
featured: ${featured}
---

${body}
`;

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = title.replace(/\s+/g, "-") + ".md";
    a.click();
  };
  const handleDateChange = (value: DateValue) => {
    if (value instanceof Date || value === null) {
      setDate(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-bold">Article CMS</h1>
          <p className="text-gray-500 mt-1">Create and export markdown articles</p>
        </header>

        {/* Meta Information */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Title</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="label">Author</label>
            <input className="input" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>

          <div className="md:col-span-2">
            <label className="label">Subheadline</label>
            <input className="input" value={subheadline} onChange={(e) => setSubheadline(e.target.value)} />
          </div>

          <div>
            <label className="label">Category</label>
            <input className="input" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>

          <div>
            <label className="label">Publish Date</label>
            <div className="mt-1">
              <DatePicker value={date} onChange={handleDateChange} className="w-full" />
            </div>
          </div>
        </section>

        {/* Tags */}
        <section>
          <label className="label">Tags</label>
          <div className="flex gap-2">
            <input className="input" placeholder="Add tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTag()} />
            <button onClick={addTag} className="btn-secondary">
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-2">
                {tag}
                <button onClick={() => removeTag(tag)} className="text-gray-500">
                  ×
                </button>
              </span>
            ))}
          </div>
        </section>

        {/* Featured */}
        <section className="flex items-center gap-3">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-5 w-5" />
          <span className="font-medium">Featured Article</span>
        </section>

        {/* Body */}
        <section>
          <label className="label">Article Body (Markdown)</label>
          <textarea rows={14} className="input font-mono" value={body} onChange={(e) => setBody(e.target.value)} />
        </section>

        {/* Action */}
        <footer className="flex justify-end">
          <button onClick={downloadMarkdown} className="btn-primary">
            Download Markdown
          </button>
        </footer>
      </div>
    </div>
  );
}
