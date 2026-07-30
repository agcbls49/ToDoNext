import { db } from "../db";
import { tasks } from "./schema";

async function seed() {
    console.log("Seeding database...");

    await db.delete(tasks);

    await db.insert(tasks).values([
        { id: 1, task: 'Code Frontend', tags: 'Tech', completed: 0 },
        { id: 2, task: 'Feed Cat', tags: 'Pet', completed: 0 },
        { id: 3, task: 'Do Laundry', tags: 'Home', completed: 1 },
        { id: 4, task: 'Study', tags: 'School', completed: 0 },
        { id: 5, task: 'Exercise', tags: 'Health', completed: 0 },
        { id: 6, task: 'Buy Essential', tags: 'Errands', completed: 1 },
        { id: 7, task: 'Take out Trash', tags: 'Home, Errands', completed: 0 },
        { id: 8, task: 'Fold clothes', tags: 'Home', completed: 1 },
        { id: 9, task: 'Study for quiz', tags: 'School', completed: 0 },
        { id: 10, task: 'Do Yoga', tags: 'Health', completed: 0 },
    ]);

    console.log("Seed completed!");
}

// added for docker to work
seed()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });