import 'dotenv/config';

import { connectToDatabase } from '@/database';

(async () => {
  await connectToDatabase();
})();
