const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: 'Arts' },
                { name: 'Business' },
                { name: 'Computer Science' },
                { name: 'Engineering' },
                { name: 'Health and Fitness' },
                { name: 'Language Learning' },
                { name: 'Social Science' },
            ]
        })

        console.log('Success')
    }
    catch (error) {
        console.log('Error seeding the database categories', error);
    }
    finally {
        await db.$disconnect();
    }
}

main();