<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\checkoutController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');

});
Route::get('/stripeSubscribe/{amount}/{plan}/{days}/{range}', [checkoutController::class, 'stripeSubscribeGet'])->name('stripeSubscribe');
Route::get('/stripeSubscribeSuccess', [checkoutController::class, 'stripeSubscribeSuccess'])->name('stripeSubscribeSuccess');
Route::get('/connect/{id}', [checkoutController::class, 'connect'])->name('connect.stripe');
