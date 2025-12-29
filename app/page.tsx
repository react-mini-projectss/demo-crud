"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";


interface PersonType {
  _id: string;
  name: string;
}

export default function Home() {
  const [name, setName] = useState<string>("");
  const [people, setPeople] = useState<PersonType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>("");

  async function loadPeople() {
    const res = await fetch("/api/person");
    setPeople(await res.json());
  }

  async function addPerson() {
    await fetch("/api/person", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    setName("");
    loadPeople();
  }

  async function updatePerson(id: string) {
    await fetch(`/api/person/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name: editingName }),
    });
    setEditingId(null);
    loadPeople();
  }

  async function deletePerson(id: string) {
    await fetch(`/api/person/${id}`, { method: "DELETE" });
    loadPeople();
  }

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <ThemeToggle />

        <h1>Next.js + MongoDB CRUD</h1>

        <input
          className="input"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn btn-primary" onClick={addPerson}>
          Add
        </button>

        <h2>People</h2>

        {people.map((p) => (
          <div key={p._id} className="list-item">
            {editingId === p._id ? (
              <>
                <input
                  className="input"
                  style={{ marginRight: "10px" }}
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                />
                <button
                  className="list-btn btn-save"
                  onClick={() => updatePerson(p._id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{p.name}</span>
                <div>
                  <button
                    className="list-btn btn-edit"
                    onClick={() => {
                      setEditingId(p._id);
                      setEditingName(p.name);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="list-btn btn-delete"
                    onClick={() => deletePerson(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
